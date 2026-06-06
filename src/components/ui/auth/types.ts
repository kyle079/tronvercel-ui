export interface AuthUser {
  id: string;
  username: string;
  roles: string[];
  provider: 'local' | 'oidc';
  claims?: Record<string, unknown>;
}

export interface SSOProvider {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}
