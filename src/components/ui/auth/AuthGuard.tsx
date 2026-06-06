import type { ReactNode } from 'react';
import { useAuth } from './useAuth';
import { AuthCard } from './AuthCard';
import { LoginForm } from './LoginForm';

export interface AuthGuardProps {
  children: ReactNode;
  /** Rendered while checking auth state */
  fallback?: ReactNode;
  /** Custom unauthenticated UI. If not provided, renders a default login card. */
  loginPage?: ReactNode;
  /** Title for the default login card */
  loginTitle?: string;
  /** Subtitle for the default login card */
  loginSubtitle?: string;
  /** SSO buttons to render inside the default login form */
  ssoButtons?: ReactNode;
}

export function AuthGuard({
  children,
  fallback,
  loginPage,
  loginTitle = 'Sign in',
  loginSubtitle,
  ssoButtons,
}: AuthGuardProps) {
  const { user, loading, login } = useAuth();

  if (loading) {
    return (
      <>
        {fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-base">
            <span className="text-sm text-muted">Loading…</span>
          </div>
        )}
      </>
    );
  }

  if (!user) {
    if (loginPage) return <>{loginPage}</>;
    return (
      <AuthCard title={loginTitle} subtitle={loginSubtitle}>
        <LoginForm onSubmit={login} ssoButtons={ssoButtons} />
      </AuthCard>
    );
  }

  return <>{children}</>;
}

export { AuthGuard as RequireAuth };
