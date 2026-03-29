import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

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
