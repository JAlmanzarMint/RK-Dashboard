import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import { hashPassword } from "./auth";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerifyToken(tokenHash: string): Promise<User | undefined>;
  getUserByResetToken(tokenHash: string): Promise<User | undefined>;
  createUser(user: InsertUser & { role?: string; emailVerifyToken?: string | null; emailVerifyExpires?: Date | null }): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async getUserByVerifyToken(tokenHash: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.emailVerifyToken === tokenHash,
    );
  }

  async getUserByResetToken(tokenHash: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.resetToken === tokenHash,
    );
  }

  async createUser(insertUser: InsertUser & { role?: string; emailVerifyToken?: string | null; emailVerifyExpires?: Date | null }): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      role: insertUser.role || "stakeholder",
      emailVerified: false,
      emailVerifyToken: insertUser.emailVerifyToken || null,
      emailVerifyExpires: insertUser.emailVerifyExpires || null,
      resetToken: null,
      resetTokenExpires: null,
      failedLoginAttempts: 0,
      lockUntil: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();

// ── Seed users ────────────────────────────────────────
const SEED_USERS = [
  { username: "Jonathan Almanzar", email: "jonathan@mintrx.com", role: "developer" },
  { username: "Joe Maclean",       email: "joe@aoicapital.com", role: "admin" },
  { username: "Taylor",            email: "taylor@medmetricsrx.com", role: "admin" },
  { username: "James Bryant",      email: "james.bryant@rklogisticsgroup.com", role: "admin" },
  { username: "David Blandford",   email: "david.blandford@rklogisticsgroup.com", role: "admin" },
  { username: "William Simpson",   email: "william.simpson@rklogisticsgroup.com", role: "admin" },
  { username: "Matthew Beckert",   email: "matthew.beckert@rklogisticsgroup.com", role: "admin" },
];

export async function seedUsers() {
  const tempPassword = process.env.SEED_PASSWORD || "RKLogistics2026!";
  const hashed = await hashPassword(tempPassword);
  let created = 0;

  for (const seed of SEED_USERS) {
    const existing = await storage.getUserByEmail(seed.email);
    if (!existing) {
      await storage.createUser({
        username: seed.username,
        email: seed.email,
        password: hashed,
        role: seed.role,
        emailVerifyToken: null,
        emailVerifyExpires: null,
      });
      // Mark as verified so they can log in immediately
      const user = await storage.getUserByEmail(seed.email);
      if (user) await storage.updateUser(user.id, { emailVerified: true });
      created++;
    }
  }

  if (created > 0) {
    console.log(`[AUTH] Seeded ${created} users (temp password: ${tempPassword})`);
    console.log("[AUTH] Users should change their password after first login");
  }
}
