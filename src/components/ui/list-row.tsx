import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ListRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Leading slot — icon or avatar. */
  leading?: ReactNode;
  /** Trailing slot — badge, action, or chevron. */
  trailing?: ReactNode;
  /** Dim a row to indicate an inactive or loading state. */
  muted?: boolean;
  /** Mark row as interactive (adds hover/cursor styles). */
  interactive?: boolean;
}

export const ListRow = forwardRef<HTMLDivElement, ListRowProps>(function ListRow(
  { leading, trailing, muted = false, interactive = false, children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex min-h-[2.5rem] items-center gap-3 px-3 py-2 text-sm',
        'border-b border-line last:border-b-0',
        interactive && 'cursor-pointer transition-colors hover:bg-raised',
        muted && 'opacity-50',
        className,
      )}
      {...props}
    >
      {leading != null && (
        <span className="flex shrink-0 items-center text-muted">{leading}</span>
      )}
      <span className="min-w-0 flex-1">{children}</span>
      {trailing != null && (
        <span className="flex shrink-0 items-center gap-1.5 text-muted">{trailing}</span>
      )}
    </div>
  );
});

/** Wraps a set of ListRow items with a flush border. */
export function ListGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-md border border-line bg-surface', className)}
      {...props}
    />
  );
}
