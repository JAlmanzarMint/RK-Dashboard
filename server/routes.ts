import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import {
  hashPassword, verifyPassword, generateToken, hashToken, sanitizeUser,
  checkRateLimit, recordFailedAttempt, clearAttempts, requireAuth,
  VERIFY_TOKEN_EXPIRY_MS, RESET_TOKEN_EXPIRY_MS,
} from "./auth";
import {
  registerSchema, loginSchema, tokenSchema, emailOnlySchema,
  resetPasswordSchema, changePasswordSchema, transcriptSchema,
  createIdeaSchema, updateIdeaSchema, cursorPromptInputSchema, uuidParam,
} from "@shared/schema";
import multer from "multer";
import OpenAI, { toFile } from "openai";
import { randomUUID } from "crypto";
import { File as NodeFile } from "node:buffer";
import path from "path";

if (typeof globalThis.File === "undefined") {
  (globalThis as any).File = NodeFile;
}

const ALLOWED_AUDIO_MIMES = new Set([
  "audio/webm", "audio/wav", "audio/wave", "audio/x-wav",
  "audio/mp3", "audio/mpeg", "audio/mp4", "audio/m4a", "audio/x-m4a",
  "audio/ogg", "audio/flac", "audio/x-flac",
  "video/webm", "video/mp4",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_AUDIO_MIMES.has(file.mimetype)) {
      return cb(new Error(`Invalid file type: ${file.mimetype}. Only audio files are accepted.`));
    }
    cb(null, true);
  },
});

function sanitizeFilename(name: string): string {
  return path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
}

function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set");
  return new OpenAI({ apiKey: key });
}

// ── Idea types ────────────────────────────────────────
export type IdeaStatus = "review" | "approved" | "dev" | "needs_feedback" | "completed" | "rejected";

export interface RefinedIdea {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  department: string;
  sectionAffected: string;
  featureWorkflow: string;
  requirements: string[];
}

export interface Idea {
  id: string;
  rawTranscript: string;
  refined: RefinedIdea | null;
  cursorPrompt: string | null;
  status: IdeaStatus;
  submittedBy: string;
  submittedByEmail: string;
  feedbackNote: string | null;
  ceoNotes: string;
  devNotes: string;
  createdAt: string;
  updatedAt: string;
}

const ideas: Map<string, Idea> = new Map();

const RK_SYSTEM_PROMPT = `You are a senior product manager and business strategist for RK Logistics, a premier 3PL warehousing and logistics company.

RK Logistics operates 12+ facilities across California, Arizona, Texas, New Jersey, and Minnesota, totaling 1.78M sqft. The company serves semiconductor, EV/battery, solar, electronics, and aerospace customers including LAM Research, Tesla, Applied Materials, Corning, and Netflix.

Key business units:
- RK Logistics: Contract warehousing, FTZ operations, distribution, value-added services
- On Time Trucking (OTT): LTL and FTL carrier serving the NY/NJ/CT tristate corridor
- Go Freight Hub: Recently acquired freight forwarding company in Miami

Departments: Sales & BD, Operations, Finance & Accounting, Customer Service, Warehouse Operations, HR & Recruiting, Marketing, Technology, Strategy, Compliance

Technology stack: React + Express dashboard, Insightly CRM (being replaced), ZoomInfo (being replaced), QuickBooks, TMS for OTT, warehouse cameras at multiple facilities

Integrations to consider: Insightly CRM data, ZoomInfo contacts, TMS feed, Gmail/Outlook, QuickBooks AR/AP, warehouse camera feeds, commercial lease documents

Leadership: Joe Maclean (CEO), James Bryant (VP Operations), Peter O'Donnell (VP Sales/BD), David Chen (Controller)`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ================================================================
  // AUTH ROUTES (public — no requireAuth)
  // ================================================================

  // ── POST /api/auth/login ───────────────────────────
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const { email, password } = parsed.data;
      const rateLimitKey = email.toLowerCase();

      // Rate-limit check
      const limit = checkRateLimit(rateLimitKey);
      if (!limit.allowed) {
        const minutes = Math.ceil(limit.retryAfterMs / 60000);
        return res.status(429).json({
          message: `Too many login attempts. Try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
        });
      }

      const user = await storage.getUserByEmail(email.toLowerCase());

      // Constant-time-ish response for invalid email to prevent enumeration
      if (!user) {
        recordFailedAttempt(rateLimitKey);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check account lock
      if (user.lockUntil && new Date(user.lockUntil) > new Date()) {
        return res.status(423).json({ message: "Account temporarily locked. Try again later." });
      }

      const valid = await verifyPassword(password, user.password);
      if (!valid) {
        recordFailedAttempt(rateLimitKey);
        const newAttempts = (user.failedLoginAttempts || 0) + 1;
        const updates: any = { failedLoginAttempts: newAttempts };
        if (newAttempts >= 5) {
          updates.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
        }
        await storage.updateUser(user.id, updates);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (!user.emailVerified) {
        return res.status(403).json({ message: "Please verify your email before logging in" });
      }

      // Reset failed attempts on success
      clearAttempts(rateLimitKey);
      await storage.updateUser(user.id, { failedLoginAttempts: 0, lockUntil: null });

      // Regenerate session to prevent fixation
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ message: "Login failed" });
        }
        req.session.userId = user.id;
        res.json({ user: sanitizeUser(user) });
      });
    } catch (err: any) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // ── POST /api/auth/logout ──────────────────────────
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("rk.sid");
      res.json({ message: "Logged out" });
    });
  });

  // ── GET /api/auth/me ───────────────────────────────
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ user: sanitizeUser(user) });
  });

  // ── POST /api/auth/verify-email ────────────────────
  app.post("/api/auth/verify-email", async (req: Request, res: Response) => {
    try {
      const parsed = tokenSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid token" });

      const tokenHash = hashToken(parsed.data.token);
      const user = await storage.getUserByVerifyToken(tokenHash);

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired verification token" });
      }
      if (user.emailVerifyExpires && new Date(user.emailVerifyExpires) < new Date()) {
        return res.status(400).json({ message: "Verification token has expired" });
      }

      await storage.updateUser(user.id, {
        emailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpires: null,
      });

      res.json({ message: "Email verified successfully" });
    } catch (err: any) {
      console.error("Verify error:", err);
      res.status(500).json({ message: "Verification failed" });
    }
  });

  // ── POST /api/auth/forgot-password ─────────────────
  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    try {
      const parsed = emailOnlySchema.safeParse(req.body);
      if (!parsed.success) return res.json({ message: "If that email exists, a reset link has been sent." });

      const user = await storage.getUserByEmail(parsed.data.email.toLowerCase());
      if (user) {
        const resetToken = generateToken();
        const resetTokenHash = hashToken(resetToken);
        await storage.updateUser(user.id, {
          resetToken: resetTokenHash,
          resetTokenExpires: new Date(Date.now() + RESET_TOKEN_EXPIRY_MS),
        });
        // In production: send email with resetToken
        console.log(`[AUTH] Password reset requested for ${email}`);
      }

      res.json({ message: "If that email exists, a reset link has been sent." });
    } catch (err: any) {
      console.error("Forgot password error:", err);
      res.json({ message: "If that email exists, a reset link has been sent." });
    }
  });

  // ── POST /api/auth/reset-password ──────────────────
  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    try {
      const parsed = resetPasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        const msg = parsed.error.errors[0]?.message || "Invalid input";
        return res.status(400).json({ message: msg });
      }

      const { token, password } = parsed.data;
      const tokenHash = hashToken(token);
      const user = await storage.getUserByResetToken(tokenHash);

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }
      if (user.resetTokenExpires && new Date(user.resetTokenExpires) < new Date()) {
        await storage.updateUser(user.id, { resetToken: null, resetTokenExpires: null });
        return res.status(400).json({ message: "Reset token has expired" });
      }

      const hashedPassword = await hashPassword(password);
      await storage.updateUser(user.id, {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
        failedLoginAttempts: 0,
        lockUntil: null,
      });

      res.json({ message: "Password reset successfully" });
    } catch (err: any) {
      console.error("Reset password error:", err);
      res.status(500).json({ message: "Password reset failed" });
    }
  });

  // ── POST /api/auth/change-password ──────────────────
  app.post("/api/auth/change-password", requireAuth, async (req: Request, res: Response) => {
    try {
      const parsed = changePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        const msg = parsed.error.errors[0]?.message || "Invalid input";
        return res.status(400).json({ message: msg });
      }

      const { currentPassword, newPassword } = parsed.data;

      const user = await storage.getUser(req.session.userId!);
      if (!user) return res.status(401).json({ message: "Not authenticated" });

      const valid = await verifyPassword(currentPassword, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUser(user.id, { password: hashedPassword });

      res.json({ message: "Password changed successfully" });
    } catch (err: any) {
      console.error("Change password error:", err);
      res.status(500).json({ message: "Password change failed" });
    }
  });

  // ================================================================
  // PROTECTED ROUTES (require auth)
  // ================================================================

  // ── POST /api/transcribe ──────────────────────────
  app.post("/api/transcribe", requireAuth, (req: Request, res: Response, next) => {
    upload.single("audio")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message || "File upload failed" });
      }
      next();
    });
  }, async (req: Request, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No audio file provided" });

      const openai = getOpenAI();
      const safeName = sanitizeFilename(req.file.originalname || "recording.webm");
      const audioFile = await toFile(
        req.file.buffer,
        safeName,
        { type: req.file.mimetype || "audio/webm" }
      );

      const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
        response_format: "text",
        prompt: "The speaker is a team member at RK Logistics dictating a business idea or feature request. Key terms: RK Logistics, On Time Trucking, OTT, FTZ, EBITDA, Insightly, ZoomInfo, pipeline, BD, Go Freight Hub, warehouse, facility, Patterson, Fremont, Goodyear, Vista Ridge, Kato. Departments: Sales, Marketing, Operations, Compliance, Engineering, Strategy, Warehouse, QC, Accounting, Procurement, Customer Service.",
      });

      res.json({ transcript: transcription });
    } catch (err: any) {
      console.error("Transcription error:", err);
      res.status(500).json({ message: err.message || "Transcription failed" });
    }
  });

  // ── POST /api/ideas/generate ──────────────────────
  app.post("/api/ideas/generate", requireAuth, async (req: Request, res: Response) => {
    try {
      const parsed = transcriptSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.errors[0]?.message || "Invalid transcript" });
      const { transcript } = parsed.data;

      const openai = getOpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `${RK_SYSTEM_PROMPT}

Your job is to take a raw voice transcript of an idea and turn it into a clear, structured, actionable feature or improvement proposal.

Format your response as JSON with these exact fields:
{
  "title": "A concise title (5-10 words)",
  "summary": "A 2-3 sentence executive summary",
  "problem": "What problem this solves or opportunity it captures",
  "solution": "Detailed description of the proposed feature/change (2-3 paragraphs)",
  "impact": "Expected business impact (revenue, efficiency, customer experience)",
  "priority": "HIGH" or "MEDIUM" or "LOW",
  "department": "Which department this primarily affects",
  "sectionAffected": "Which section of the CEO Dashboard platform this idea would live in or modify. Choose from: Dashboard, Goals, Business Development, Customers, Facilities, Facility Pricing, Bench Strength, OTT Carriers, OTT Pricing, Route Optimizer, Utilization AI, Facility Profile, Financials, Liquidity, Email Pulse, Recruiting, Market Intel, Technology, Marketing, Strategy Hub, Strategy Simulation, Pipeline, Idea Pipeline, or 'New Section' if it needs its own page.",
  "featureWorkflow": "The exact feature, widget, or workflow being requested — be specific. Examples: 'AR Aging Dashboard Widget', 'Deal Pipeline Funnel Chart', 'License Expiration Alert System', 'Pick-Pack Real-Time Status Board', 'Email Campaign Builder with Segmentation'. Keep it to 3-12 words describing the concrete deliverable.",
  "requirements": ["requirement 1", "requirement 2", "requirement 3", "requirement 4"]
}

Return ONLY valid JSON. No markdown, no code blocks, just the JSON object.`
          },
          {
            role: "user",
            content: `Transform this voice transcript into a structured idea:\n\n"${transcript}"`
          }
        ],
      });

      const content = completion.choices[0]?.message?.content || "{}";
      let refined;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        refined = JSON.parse(jsonMatch ? jsonMatch[0] : content);
      } catch {
        refined = {
          title: "New Idea",
          summary: content.slice(0, 200),
          problem: "See summary",
          solution: content,
          impact: "TBD",
          priority: "MEDIUM",
          department: "General",
          sectionAffected: "Dashboard",
          featureWorkflow: "Review and define specific feature",
          requirements: ["Review and refine this idea"],
        };
      }

      res.json({ refined });
    } catch (err: any) {
      console.error("Generate error:", err);
      res.status(500).json({ message: err.message || "Idea generation failed" });
    }
  });

  // ── POST /api/ideas/cursor-prompt ─────────────────
  app.post("/api/ideas/cursor-prompt", requireAuth, async (req: Request, res: Response) => {
    try {
      const reqUser = await storage.getUser(req.session.userId!);
      if (!reqUser || reqUser.role !== "developer") {
        return res.status(403).json({ message: "Only developers can generate cursor prompts" });
      }

      const parsed = cursorPromptInputSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.errors[0]?.message || "Invalid idea data" });
      const { idea } = parsed.data;

      const openai = getOpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 4000,
        messages: [
          {
            role: "system",
            content: `You are an expert Cursor AI prompt engineer. Your job is to take an approved feature idea and generate a comprehensive, production-ready Cursor prompt that a developer can paste into Cursor to implement the feature.

The platform context:
- Framework: React 18 + Vite + Express 5 (single-port fullstack)
- Language: TypeScript
- Styling: Tailwind CSS 3 + shadcn/ui components
- Charts: Recharts
- Maps: Leaflet / react-leaflet
- Icons: lucide-react
- Routing: wouter with hash-based routing (useHashLocation)
- State: React useState/useEffect (no Redux)
- Data: TypeScript files under client/src/lib/ (transitioning to API-backed)
- API: Express routes in server/routes.ts, same-origin
- Build: Vite frontend to dist/public/, esbuild server to dist/index.cjs
- Deploy: Railway (Nixpacks)

Key directories:
- client/src/pages/*.tsx — page components
- client/src/components/ui/ — shadcn/ui components (Card, Badge, Table, etc.)
- client/src/components/Layout.tsx — sidebar navigation
- client/src/lib/*.ts — data files and utilities
- server/routes.ts — Express API routes
- server/storage.ts — storage interface

Design system:
- Primary color: green (--primary: 100 41% 46%)
- Font: Inter
- Text sizes: text-xs (10px body), text-sm (labels), text-[10px] (micro)
- Cards: Card/CardContent/CardHeader/CardTitle from shadcn/ui
- Badges: Badge with variant="outline" and bg-color/10 patterns
- Dark mode: .dark class on html element

Rules:
- NEVER break existing functionality
- NEVER use localStorage or sessionStorage
- NEVER upgrade Tailwind to v4
- Maintain dark mode compatibility
- Use existing shadcn/ui components
- Export pages as default functions
- All data imports from @/lib/ or fetched from /api/

Generate the prompt as a complete markdown document ready to paste into Cursor. Be specific about file paths, imports, and component structure.`
          },
          {
            role: "user",
            content: `Generate a Cursor implementation prompt for this approved idea:

Title: ${idea.title}
Summary: ${idea.summary}
Problem: ${idea.problem}
Solution: ${idea.solution}
Department: ${idea.department}
Section Affected: ${idea.sectionAffected}
Feature/Workflow: ${idea.featureWorkflow}
Priority: ${idea.priority}
Requirements:
${idea.requirements.map((r: string, i: number) => `${i + 1}. ${r}`).join("\n")}`
          }
        ],
      });

      const cursorPrompt = completion.choices[0]?.message?.content || "";
      res.json({ cursorPrompt });
    } catch (err: any) {
      console.error("Cursor prompt error:", err);
      res.status(500).json({ message: err.message || "Cursor prompt generation failed" });
    }
  });

  // ── POST /api/ideas ─────────────────────────────────
  app.post("/api/ideas", requireAuth, async (req: Request, res: Response) => {
    const user = await storage.getUser(req.session.userId!);
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    const parsed = createIdeaSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.errors[0]?.message || "Invalid idea data" });

    const { rawTranscript, refined, ceoNotes } = parsed.data;

    const idea: Idea = {
      id: randomUUID(),
      rawTranscript,
      refined: refined || null,
      cursorPrompt: null,
      status: "review",
      submittedBy: user.username,
      submittedByEmail: user.email,
      feedbackNote: null,
      ceoNotes,
      devNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ideas.set(idea.id, idea);
    res.status(201).json(idea);
  });

  // ── GET /api/ideas ──────────────────────────────────
  app.get("/api/ideas", requireAuth, (_req: Request, res: Response) => {
    const all = Array.from(ideas.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json(all);
  });

  // ── GET /api/ideas/:id ──────────────────────────────
  app.get("/api/ideas/:id", requireAuth, (req: Request, res: Response) => {
    if (!uuidParam.safeParse(req.params.id).success) return res.status(400).json({ message: "Invalid ID format" });
    const idea = ideas.get(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json(idea);
  });

  // ── PATCH /api/ideas/:id ────────────────────────────
  app.patch("/api/ideas/:id", requireAuth, async (req: Request, res: Response) => {
    if (!uuidParam.safeParse(req.params.id).success) return res.status(400).json({ message: "Invalid ID format" });

    const parsed = updateIdeaSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.errors[0]?.message || "Invalid update data" });

    const reqUser = await storage.getUser(req.session.userId!);
    if (!reqUser) return res.status(401).json({ message: "Not authenticated" });

    const idea = ideas.get(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    const role = reqUser.role;
    const isSubmitter = reqUser.email === idea.submittedByEmail;
    const { status, ceoNotes, devNotes, feedbackNote, cursorPrompt, refined } = parsed.data;

    // Developer actions: any status transition, cursor prompts, dev notes, feedback notes
    if (cursorPrompt !== undefined && role !== "developer") {
      return res.status(403).json({ message: "Only developers can set cursor prompts" });
    }
    if (devNotes !== undefined && role !== "developer") {
      return res.status(403).json({ message: "Only developers can set developer notes" });
    }

    if (status !== undefined) {
      const VALID_STATUSES: IdeaStatus[] = ["review", "approved", "dev", "needs_feedback", "completed", "rejected"];
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // Developer-only transitions
      if (["needs_feedback", "completed"].includes(status) && role !== "developer") {
        return res.status(403).json({ message: "Only developers can perform this action" });
      }

      // Admin or developer can approve / move to dev / reject
      if (["approved", "dev", "rejected"].includes(status) && role !== "developer" && role !== "admin") {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      // Resubmit (review): only the original submitter when idea is in needs_feedback
      if (status === "review" && idea.status === "needs_feedback") {
        if (!isSubmitter && role !== "developer") {
          return res.status(403).json({ message: "Only the original submitter can resubmit this idea" });
        }
      }

      idea.status = status;
    }

    // Refined content edits: only submitter when sent back, or developer
    if (refined !== undefined) {
      if (role === "developer" || (isSubmitter && idea.status === "needs_feedback")) {
        idea.refined = refined;
      } else {
        return res.status(403).json({ message: "You can only edit ideas sent back to you for feedback" });
      }
    }

    if (ceoNotes !== undefined) idea.ceoNotes = ceoNotes;
    if (feedbackNote !== undefined && role === "developer") idea.feedbackNote = feedbackNote;
    if (cursorPrompt !== undefined) idea.cursorPrompt = cursorPrompt;
    if (devNotes !== undefined) idea.devNotes = devNotes;
    idea.updatedAt = new Date().toISOString();

    ideas.set(idea.id, idea);
    res.json(idea);
  });

  // ── DELETE /api/ideas/:id ───────────────────────────
  app.delete("/api/ideas/:id", requireAuth, async (req: Request, res: Response) => {
    if (!uuidParam.safeParse(req.params.id).success) return res.status(400).json({ message: "Invalid ID format" });

    const reqUser = await storage.getUser(req.session.userId!);
    if (!reqUser) return res.status(401).json({ message: "Not authenticated" });

    if (reqUser.role !== "developer" && reqUser.role !== "admin") {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    if (!ideas.has(req.params.id)) return res.status(404).json({ message: "Idea not found" });
    ideas.delete(req.params.id);
    res.json({ message: "Deleted" });
  });

  return httpServer;
}
