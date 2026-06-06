import type { Request } from 'express';
import type { SessionData } from 'express-session';

export interface AuthUser {
  id: string;
  username: string;
  roles: string[];
  provider: 'local' | 'oidc';
  claims?: Record<string, unknown>;
}

export interface StoredUser {
  id: string;
  username: string;
  passwordHash?: string;
  roles: string[];
}

export interface UserStore {
  findByUsername(username: string): Promise<StoredUser | null>;
  findById(id: string): Promise<StoredUser | null>;
  create(user: Omit<StoredUser, 'id'>): Promise<StoredUser>;
  list(): Promise<StoredUser[]>;
}

export interface LocalConfig {
  usersFile?: string;
  adminUser?: string;
  adminPass?: string;
}

export interface OidcConfig {
  issuer: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope?: string;
  rolesClaim?: string;
  allowlistClaim?: string;
}

export interface AuthConfig {
  mode: 'local' | 'oidc' | 'both';
  sessionSecret: string;
  sessionName?: string;
  sessionMaxAge?: number;
  local?: LocalConfig;
  oidc?: OidcConfig;
  allowlist?: string[];
  userStore?: UserStore;
  mountPath?: string;
  loginPath?: string;
}

declare module 'express-session' {
  interface SessionData {
    user?: AuthUser;
    oidcState?: string;
    oidcNonce?: string;
    returnTo?: string;
  }
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  session: Request['session'] & SessionData;
}
