import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ActionRowProps extends HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  right?: ReactNode;
}

/** Compact operator control row with responsive wrapping. */
export function ActionRow({ left, right, children, className, ...props }: ActionRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-md border border-line bg-surface/70 px-3 py-2 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{left ?? children}</div>
      {right != null && (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{right}</div>
      )}
    </div>
  );
}

export interface ActionGroupProps extends HTMLAttributes<HTMLDivElement> {
  grow?: boolean;
}

/** Groups related controls inside an ActionRow with consistent compact spacing. */
export function ActionGroup({ grow = false, className, ...props }: ActionGroupProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-wrap items-center gap-2',
        grow && 'flex-1',
        className,
      )}
      {...props}
    />
  );
}

export interface ActionMetaProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  hint?: ReactNode;
}

/** Small text block for queue counts, selection state, or filter summaries. */
export function ActionMeta({ label, hint, className, children, ...props }: ActionMetaProps) {
  return (
    <div className={cn('min-w-0', className)} {...props}>
      {label != null && <div className="truncate text-xs font-medium text-fg">{label}</div>}
      {hint != null && <div className="truncate font-mono text-2xs text-faint">{hint}</div>}
      {children}
    </div>
  );
}
