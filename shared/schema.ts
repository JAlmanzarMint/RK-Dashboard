import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("stakeholder"),
  emailVerified: boolean("email_verified").notNull().default(false),
  emailVerifyToken: text("email_verify_token"),
  emailVerifyExpires: timestamp("email_verify_expires"),
  resetToken: text("reset_token"),
  resetTokenExpires: timestamp("reset_token_expires"),
  failedLoginAttempts: integer("failed_login_attempts").notNull().default(0),
  lockUntil: timestamp("lock_until"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").max(254),
  password: z.string().min(1, "Password is required").max(128),
});

export const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address").max(254),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

// ── Sanitization helper ──────────────────────────────────
const safeText = (maxLen: number) =>
  z.string().max(maxLen).transform((s) => s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/<[^>]*>/g, "").trim());

// ── Token schemas ────────────────────────────────────────
export const tokenSchema = z.object({
  token: z.string().min(1).max(256).regex(/^[a-f0-9]+$/i, "Invalid token format"),
});

export const emailOnlySchema = z.object({
  email: z.string().email("Invalid email address").max(254),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1).max(256).regex(/^[a-f0-9]+$/i, "Invalid token format"),
  password: registerSchema.shape.password,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: registerSchema.shape.password,
});

// ── Idea validation schemas ──────────────────────────────
const VALID_PRIORITIES = ["HIGH", "MEDIUM", "LOW"] as const;

export const refinedIdeaSchema = z.object({
  title: safeText(200),
  summary: safeText(2000),
  problem: safeText(5000),
  solution: safeText(10000),
  impact: safeText(5000),
  priority: z.enum(VALID_PRIORITIES),
  department: safeText(100),
  sectionAffected: safeText(100),
  featureWorkflow: safeText(200),
  requirements: z.array(safeText(500)).max(20),
});

export const transcriptSchema = z.object({
  transcript: z.string().min(1, "No transcript provided").max(50000),
});

export const refineEditSchema = z.object({
  transcript: z.string().min(1, "No transcript provided").max(50000),
  existingRefined: refinedIdeaSchema,
});

export const createIdeaSchema = z.object({
  rawTranscript: safeText(50000).optional().default(""),
  refined: refinedIdeaSchema.nullable().optional().default(null),
  ceoNotes: safeText(5000).optional().default(""),
});

export const updateIdeaSchema = z.object({
  status: z.enum(["review", "approved", "dev", "needs_feedback", "completed", "rejected"]).optional(),
  ceoNotes: safeText(5000).optional(),
  devNotes: safeText(5000).optional(),
  feedbackNote: safeText(5000).nullable().optional(),
  cursorPrompt: z.string().max(50000).nullable().optional(),
  refined: refinedIdeaSchema.nullable().optional(),
});

export const cursorPromptInputSchema = z.object({
  idea: z.object({
    title: z.string().max(200),
    summary: z.string().max(2000),
    problem: z.string().max(5000),
    solution: z.string().max(10000),
    department: z.string().max(100),
    sectionAffected: z.string().max(100).optional().default("TBD"),
    featureWorkflow: z.string().max(200).optional().default("TBD"),
    priority: z.enum(VALID_PRIORITIES),
    requirements: z.array(z.string().max(500)).max(20).optional().default([]),
  }),
});

export const uuidParam = z.string().uuid("Invalid ID format");

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface SafeUser {
  id: string;
  username: string;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: Date | null;
}
