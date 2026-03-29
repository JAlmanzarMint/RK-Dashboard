import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { getSessionConfig, blockBots, perUserRateLimit } from "./auth";
import { seedUsers } from "./storage";
import { securityLog } from "./security-logger";

const app = express();
const httpServer = createServer(app);
const isProd = process.env.NODE_ENV === "production";

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// ── HTTPS redirect (production behind Railway/proxy) ────
if (isProd) {
  app.use((req, res, next) => {
    // Skip redirect for internal health checks (no x-forwarded-proto = direct connection)
    if (!req.headers["x-forwarded-proto"]) return next();
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// ── Security headers ───────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: isProd
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https://*.tile.openstreetmap.org"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
    hsts: isProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// ── Bot detection on API routes (with logging) ──────────
app.use("/api", blockBots);

// ── Rate limit handler factory (with security logging) ──
function rateLimitWithLog(opts: Parameters<typeof rateLimit>[0], label: string) {
  return rateLimit({
    ...opts,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
      securityLog("RATE_LIMITED", req, { userId: req.session?.userId, detail: label });
      const msg = typeof opts.message === "object" && opts.message !== null && "message" in opts.message
        ? (opts.message as { message: string }).message
        : "Too many requests";
      res.status(429).json({ message: msg });
    },
  });
}

// ── Global rate limiter (60 req/min per IP) ─────────────
app.use(rateLimitWithLog({ windowMs: 60_000, max: 60, message: { message: "Too many requests, slow down" } }, "global"));

// ── Auth endpoints: 10 req/15min per IP ─────────────────
app.use("/api/auth", rateLimitWithLog({ windowMs: 15 * 60_000, max: 10, message: { message: "Too many authentication attempts, try again later" } }, "auth"));

// ── AI endpoints: 10 req/15min per IP (OpenAI cost) ─────
const aiLimiter = rateLimitWithLog({ windowMs: 15 * 60_000, max: 10, message: { message: "AI request limit reached. Please wait before trying again." } }, "ai-generation");
app.use("/api/transcribe", aiLimiter);
app.use("/api/ideas/generate", aiLimiter);
app.use("/api/ideas/refine-edit", aiLimiter);
app.use("/api/ideas/cursor-prompt", aiLimiter);

// ── Write endpoints: 30 req/15min per IP ────────────────
const writeLimiter = rateLimitWithLog({ windowMs: 15 * 60_000, max: 30, message: { message: "Too many write operations. Please slow down." } }, "write-ideas");
app.post("/api/ideas", writeLimiter);
app.patch("/api/ideas/{*path}", writeLimiter);
app.delete("/api/ideas/{*path}", writeLimiter);

// ── Body parsing ───────────────────────────────────────
app.use(
  express.json({
    limit: "1mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

// ── Session ────────────────────────────────────────────
const SessionStore = MemoryStore(session);
app.set("trust proxy", 1); // trust Railway's proxy for secure cookies

app.use(
  session({
    ...getSessionConfig(),
    store: new SessionStore({ checkPeriod: 86400000 }), // prune expired every 24h
  })
);

// ── Per-user session rate limit (40 req/min) ────────────
// Must be after session middleware so req.session.userId is available
app.use("/api", perUserRateLimit(40));

// ── Request logging (API only) ─────────────────────────
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      // Never log auth payloads (passwords, tokens)
      if (!path.startsWith("/api/auth")) {
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse).slice(0, 200)}`;
        }
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    await seedUsers();
  } catch (err) {
    console.error("[AUTH] SEED FAILED:", err);
  }
  await registerRoutes(httpServer, app);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    securityLog("API_ERROR", req, { userId: req.session?.userId, detail: `${status}: ${message}` });

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
