import * as bcrypt from 'bcryptjs';

const ROUNDS = 12;

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, ROUNDS);
}

export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

export function isHash(s: string): boolean {
  return /^\$2[ab]\$\d+\$/.test(s);
}
