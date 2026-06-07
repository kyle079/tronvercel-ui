import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Zero-results or first-use empty panel. */
export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-12 text-center',
        className,
      )}
      {...props}
    >
      {icon != null && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-raised text-muted text-xl">
          {icon}
        </div>
      )}
      <div className="max-w-xs space-y-1">
        <p className="text-sm font-medium text-fg">{title}</p>
        {description != null && <p className="text-xs text-muted">{description}</p>}
      </div>
      {action != null && <div className="mt-1">{action}</div>}
    </div>
  );
}

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

/** Full-panel loading placeholder. */
export function LoadingState({ label = 'Loading…', className, ...props }: LoadingStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}
      aria-label={label}
      {...props}
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-accent" />
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  retry?: () => void;
}

/** Error display panel for failed data fetches. */
export function ErrorState({
  title = 'Something went wrong',
  message,
  retry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3 px-6 py-12 text-center', className)}
      role="alert"
      {...props}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-danger/30 bg-danger/10 text-danger text-lg">
        ✕
      </div>
      <div className="max-w-xs space-y-1">
        <p className="text-sm font-medium text-fg">{title}</p>
        {message != null && <p className="text-xs text-muted">{message}</p>}
      </div>
      {retry != null && (
        <button
          type="button"
          onClick={retry}
          className="mt-1 rounded border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:bg-raised hover:text-fg"
        >
          Try again
        </button>
      )}
    </div>
  );
}
