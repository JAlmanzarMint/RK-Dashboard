import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import OpenAI, { toFile } from "openai";
import { randomUUID } from "crypto";
import { File as NodeFile } from "node:buffer";

if (typeof globalThis.File === "undefined") {
  (globalThis as any).File = NodeFile;
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set");
  return new OpenAI({ apiKey: key });
}

// ── In-memory idea store ──────────────────────────────
export interface Idea {
  id: string;
  rawTranscript: string;
  optimizedTitle: string;
  optimizedDescription: string;
  category: string;
  impactEstimate: string;
  aiSuggestions: string[];
  ceoNotes: string;
  status: "draft" | "approved" | "in-progress" | "completed" | "rejected";
  devNotes: string;
  createdAt: string;
  updatedAt: string;
}

const ideas: Map<string, Idea> = new Map();

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── POST /api/transcribe ──────────────────────────
  app.post("/api/transcribe", upload.single("audio"), async (req: Request, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No audio file provided" });

      const openai = getOpenAI();
      const audioFile = await toFile(
        req.file.buffer,
        req.file.originalname || "recording.webm",
        { type: req.file.mimetype || "audio/webm" }
      );

      const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
        response_format: "text",
        prompt: "The speaker is Joe Maclean, CEO of RK Logistics. He is dictating business ideas about warehouse operations, logistics technology, acquisitions, pricing, dashboard features, OTT trucking, facilities, and team management. Key terms: RK Logistics, On Time Trucking, OTT, FTZ, EBITDA, Insightly, ZoomInfo, pipeline, BD, go freight hub.",
      });

      res.json({ text: transcription });
    } catch (err: any) {
      console.error("Transcription error:", err);
      res.status(500).json({ message: err.message || "Transcription failed" });
    }
  });

  // ── POST /api/optimize-idea ───────────────────────
  app.post("/api/optimize-idea", async (req: Request, res: Response) => {
    try {
      const { transcript } = req.body;
      if (!transcript) return res.status(400).json({ message: "No transcript provided" });

      const openai = getOpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: `You are an expert business strategist and product manager for RK Logistics, a 3PL warehousing and logistics company. The CEO, Joe Maclean, has spoken an idea into his microphone. Your job is to:

1. Clean up and structure the raw transcript into a clear idea
2. Generate a concise title (max 10 words)
3. Write a clear, structured description of the idea (2-4 paragraphs)
4. Categorize it (one of: Platform Feature, Revenue Optimization, Cost Reduction, Operations, Acquisition Strategy, Sales & BD, Customer Experience, Technology, HR & Culture, Marketing)
5. Estimate potential business impact (e.g., "$50K-100K annual savings" or "15% efficiency improvement" or "New revenue channel")
6. Suggest 3-5 specific actionable next steps to implement the idea

Respond in this exact JSON format:
{
  "title": "...",
  "description": "...",
  "category": "...",
  "impactEstimate": "...",
  "suggestions": ["step 1", "step 2", "step 3"]
}`
          },
          { role: "user", content: transcript }
        ],
      });

      const content = completion.choices[0]?.message?.content || "";
      let parsed;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
      } catch {
        parsed = {
          title: "New Idea",
          description: content,
          category: "Platform Feature",
          impactEstimate: "TBD",
          suggestions: ["Review and refine this idea"],
        };
      }

      res.json(parsed);
    } catch (err: any) {
      console.error("Optimize error:", err);
      res.status(500).json({ message: err.message || "Optimization failed" });
    }
  });

  // ── POST /api/ideas ─────────────────────────────────
  app.post("/api/ideas", (req: Request, res: Response) => {
    const { rawTranscript, optimizedTitle, optimizedDescription, category, impactEstimate, aiSuggestions, ceoNotes } = req.body;

    const idea: Idea = {
      id: randomUUID(),
      rawTranscript: rawTranscript || "",
      optimizedTitle: optimizedTitle || "Untitled Idea",
      optimizedDescription: optimizedDescription || "",
      category: category || "Platform Feature",
      impactEstimate: impactEstimate || "TBD",
      aiSuggestions: aiSuggestions || [],
      ceoNotes: ceoNotes || "",
      status: "draft",
      devNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ideas.set(idea.id, idea);
    res.status(201).json(idea);
  });

  // ── GET /api/ideas ──────────────────────────────────
  app.get("/api/ideas", (_req: Request, res: Response) => {
    const all = Array.from(ideas.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json(all);
  });

  // ── GET /api/ideas/:id ──────────────────────────────
  app.get("/api/ideas/:id", (req: Request, res: Response) => {
    const idea = ideas.get(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json(idea);
  });

  // ── PATCH /api/ideas/:id ────────────────────────────
  app.patch("/api/ideas/:id", (req: Request, res: Response) => {
    const idea = ideas.get(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    const { status, ceoNotes, devNotes, optimizedTitle, optimizedDescription } = req.body;
    if (status !== undefined) idea.status = status;
    if (ceoNotes !== undefined) idea.ceoNotes = ceoNotes;
    if (devNotes !== undefined) idea.devNotes = devNotes;
    if (optimizedTitle !== undefined) idea.optimizedTitle = optimizedTitle;
    if (optimizedDescription !== undefined) idea.optimizedDescription = optimizedDescription;
    idea.updatedAt = new Date().toISOString();

    ideas.set(idea.id, idea);
    res.json(idea);
  });

  // ── DELETE /api/ideas/:id ───────────────────────────
  app.delete("/api/ideas/:id", (req: Request, res: Response) => {
    if (!ideas.has(req.params.id)) return res.status(404).json({ message: "Idea not found" });
    ideas.delete(req.params.id);
    res.json({ message: "Deleted" });
  });

  return httpServer;
}
