import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser } from './types';
import { AuthContext } from './context';

export interface AuthProviderProps {
  children: ReactNode;
  /** Base path where @tronvercel/auth is mounted. Default: '/auth' */
  authBasePath?: string;
}

export function AuthProvider({ children, authBasePath = '/auth' }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${authBasePath}/me`, {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = (await res.json()) as { user: AuthUser };
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [authBasePath]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(
    async (username: string, password: string) => {
      setError(null);
      const res = await fetch(`${authBasePath}/login`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? 'Login failed');
      }
      const data = (await res.json()) as { user: AuthUser };
      setUser(data.user);
    },
    [authBasePath],
  );

  const logout = useCallback(async () => {
    setError(null);
    await fetch(`${authBasePath}/logout`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    });
    setUser(null);
  }, [authBasePath]);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
