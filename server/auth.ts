import bcrypt from "bcryptjs";
import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";
import type { User, SafeUser } from "@shared/schema";

const BCRYPT_ROUNDS = 12;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const VERIFY_TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

// ── Password hashing ──────────────────────────────────
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ── Token generation ──────────────────────────────────
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// ── User sanitization (strip secrets before sending to client) ──
export function sanitizeUser(user: User): SafeUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  };
}

// ── Rate limiting for login ───────────────────────────
const loginAttempts = new Map<string, { count: number; firstAttempt: number; lockedUntil: number }>();

function cleanupAttempts() {
  const now = Date.now();
  for (const [key, val] of loginAttempts) {
    if (now - val.firstAttempt > LOCK_DURATION_MS && now > val.lockedUntil) {
      loginAttempts.delete(key);
    }
  }
}

setInterval(cleanupAttempts, 60_000);

export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = loginAttempts.get(key);

  if (!entry) return { allowed: true, retryAfterMs: 0 };

  if (entry.lockedUntil > now) {
    return { allowed: false, retryAfterMs: entry.lockedUntil - now };
  }

  if (now - entry.firstAttempt > LOCK_DURATION_MS) {
    loginAttempts.delete(key);
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_LOGIN_ATTEMPTS) {
    entry.lockedUntil = now + LOCK_DURATION_MS;
    return { allowed: false, retryAfterMs: LOCK_DURATION_MS };
  }

  return { allowed: true, retryAfterMs: 0 };
}

export function recordFailedAttempt(key: string) {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry) {
    loginAttempts.set(key, { count: 1, firstAttempt: now, lockedUntil: 0 });
  } else {
    entry.count++;
    if (entry.count >= MAX_LOGIN_ATTEMPTS) {
      entry.lockedUntil = now + LOCK_DURATION_MS;
    }
  }
}

export function clearAttempts(key: string) {
  loginAttempts.delete(key);
}

// ── Session typing ────────────────────────────────────
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

// ── Auth middleware ────────────────────────────────────
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

// ── Session configuration ─────────────────────────────
export function getSessionConfig() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") {
      console.error("FATAL: SESSION_SECRET must be set and be at least 32 characters in production");
      process.exit(1);
    }
    console.warn("WARNING: Using default session secret — set SESSION_SECRET env var for production");
  }

  return {
    secret: secret || "dev-only-insecure-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    name: "rk.sid",
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: SESSION_MAX_AGE_MS,
      path: "/",
    },
  };
}

export { VERIFY_TOKEN_EXPIRY_MS, RESET_TOKEN_EXPIRY_MS };
