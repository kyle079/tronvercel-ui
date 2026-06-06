import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { StoredUser, UserStore } from './types';

export class MemoryStore implements UserStore {
  private users: Map<string, StoredUser> = new Map();
  private byUsername: Map<string, string> = new Map();

  async seed(users: Omit<StoredUser, 'id'>[]): Promise<void> {
    for (const u of users) {
      await this.create(u);
    }
  }

  async findByUsername(username: string): Promise<StoredUser | null> {
    const id = this.byUsername.get(username.toLowerCase());
    return id ? (this.users.get(id) ?? null) : null;
  }

  async findById(id: string): Promise<StoredUser | null> {
    return this.users.get(id) ?? null;
  }

  async create(user: Omit<StoredUser, 'id'>): Promise<StoredUser> {
    const existing = this.byUsername.get(user.username.toLowerCase());
    if (existing) throw new Error(`User '${user.username}' already exists`);
    const stored: StoredUser = { ...user, id: uuidv4() };
    this.users.set(stored.id, stored);
    this.byUsername.set(stored.username.toLowerCase(), stored.id);
    return stored;
  }

  async list(): Promise<StoredUser[]> {
    return Array.from(this.users.values());
  }
}

export class FileStore implements UserStore {
  private filePath: string;
  private cache: StoredUser[] | null = null;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
  }

  private load(): StoredUser[] {
    if (this.cache) return this.cache;
    if (!fs.existsSync(this.filePath)) {
      this.cache = [];
      return this.cache;
    }
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    this.cache = JSON.parse(raw) as StoredUser[];
    return this.cache;
  }

  private save(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(this.cache, null, 2));
  }

  async findByUsername(username: string): Promise<StoredUser | null> {
    return this.load().find((u) => u.username.toLowerCase() === username.toLowerCase()) ?? null;
  }

  async findById(id: string): Promise<StoredUser | null> {
    return this.load().find((u) => u.id === id) ?? null;
  }

  async create(user: Omit<StoredUser, 'id'>): Promise<StoredUser> {
    const users = this.load();
    if (users.find((u) => u.username.toLowerCase() === user.username.toLowerCase())) {
      throw new Error(`User '${user.username}' already exists`);
    }
    const stored: StoredUser = { ...user, id: uuidv4() };
    users.push(stored);
    this.save();
    return stored;
  }

  async list(): Promise<StoredUser[]> {
    return [...this.load()];
  }
}
