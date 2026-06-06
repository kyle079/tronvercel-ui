import { type FormEvent, type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';

export interface LoginFormProps {
  /** Called with validated username+password. Should throw on auth failure. */
  onSubmit?: (username: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  /** Slot for SSO buttons rendered below the divider */
  ssoButtons?: ReactNode;
  className?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  submitLabel?: string;
}

export function LoginForm({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
  ssoButtons,
  className,
  usernameLabel = 'Username',
  passwordLabel = 'Password',
  submitLabel = 'Sign in',
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const loading = externalLoading ?? internalLoading;
  const error = externalError ?? internalError;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;
    setInternalError(null);
    setInternalLoading(true);
    try {
      await onSubmit(username, password);
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className={cn('space-y-4', className)}>
      <div className="space-y-1.5">
        <Label htmlFor="auth-username">{usernameLabel}</Label>
        <Input
          id="auth-username"
          type="text"
          autoComplete="username"
          autoFocus
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="auth-password">{passwordLabel}</Label>
        <Input
          id="auth-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && (
        <p className="rounded border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? 'Signing in…' : submitLabel}
      </Button>

      {ssoButtons && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-line" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface px-2 text-xs text-muted">or</span>
            </div>
          </div>
          <div className="space-y-2">{ssoButtons}</div>
        </>
      )}
    </form>
  );
}
