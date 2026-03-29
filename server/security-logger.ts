import type { Request } from "express";

type SecurityEvent =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGIN_LOCKED"
  | "LOGOUT"
  | "PASSWORD_CHANGED"
  | "PASSWORD_RESET_REQUEST"
  | "PASSWORD_RESET_COMPLETE"
  | "RATE_LIMITED"
  | "BOT_BLOCKED"
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "VALIDATION_ERROR"
  | "API_ERROR"
  | "SUSPICIOUS_PATTERN";

interface SecurityLogEntry {
  timestamp: string;
  event: SecurityEvent;
  ip: string;
  method: string;
  path: string;
  userId?: string;
  email?: string;
  detail?: string;
  userAgent?: string;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function formatEntry(entry: SecurityLogEntry): string {
  const parts = [
    `[SECURITY] ${entry.event}`,
    `ip=${entry.ip}`,
    `${entry.method} ${entry.path}`,
  ];
  if (entry.userId) parts.push(`user=${entry.userId}`);
  if (entry.email) parts.push(`email=${entry.email}`);
  if (entry.detail) parts.push(`detail="${entry.detail}"`);
  return parts.join(" | ");
}

export function securityLog(event: SecurityEvent, req: Request, extra?: { userId?: string; email?: string; detail?: string }) {
  const entry: SecurityLogEntry = {
    timestamp: new Date().toISOString(),
    event,
    ip: getClientIp(req),
    method: req.method,
    path: req.path,
    userId: extra?.userId,
    email: extra?.email,
    detail: extra?.detail,
    userAgent: (req.headers["user-agent"] || "").slice(0, 120),
  };

  console.log(formatEntry(entry));

  trackAnomaly(entry);
}

// ── Anomaly detection ────────────────────────────────────
// Track per-IP event counts in sliding windows to detect suspicious patterns

interface IpWindow {
  loginFails: number;
  distinctEmails: Set<string>;
  botBlocks: number;
  rateLimits: number;
  windowStart: number;
}

const ipWindows = new Map<string, IpWindow>();
const ANOMALY_WINDOW_MS = 10 * 60_000; // 10-minute window

setInterval(() => {
  const now = Date.now();
  for (const [ip, w] of ipWindows) {
    if (now - w.windowStart > ANOMALY_WINDOW_MS) ipWindows.delete(ip);
  }
}, 60_000);

function getWindow(ip: string): IpWindow {
  const now = Date.now();
  let w = ipWindows.get(ip);
  if (!w || now - w.windowStart > ANOMALY_WINDOW_MS) {
    w = { loginFails: 0, distinctEmails: new Set(), botBlocks: 0, rateLimits: 0, windowStart: now };
    ipWindows.set(ip, w);
  }
  return w;
}

function trackAnomaly(entry: SecurityLogEntry) {
  const w = getWindow(entry.ip);

  if (entry.event === "LOGIN_FAILED") {
    w.loginFails++;
    if (entry.email) w.distinctEmails.add(entry.email);

    // Credential stuffing: many different emails from same IP
    if (w.distinctEmails.size >= 5) {
      console.warn(`[SECURITY] SUSPICIOUS_PATTERN | ip=${entry.ip} | detail="Credential stuffing suspected: ${w.distinctEmails.size} distinct emails attempted in 10min"`);
    }

    // Brute force: many failures from same IP
    if (w.loginFails >= 10) {
      console.warn(`[SECURITY] SUSPICIOUS_PATTERN | ip=${entry.ip} | detail="Brute force suspected: ${w.loginFails} login failures in 10min"`);
    }
  }

  if (entry.event === "RATE_LIMITED") {
    w.rateLimits++;
    if (w.rateLimits >= 5) {
      console.warn(`[SECURITY] SUSPICIOUS_PATTERN | ip=${entry.ip} | detail="Persistent rate limit abuse: ${w.rateLimits} limit hits in 10min"`);
    }
  }

  if (entry.event === "BOT_BLOCKED") {
    w.botBlocks++;
    if (w.botBlocks >= 3) {
      console.warn(`[SECURITY] SUSPICIOUS_PATTERN | ip=${entry.ip} | detail="Repeated bot probing: ${w.botBlocks} blocks in 10min" | ua="${entry.userAgent}"`);
    }
  }
}

export { getClientIp };
