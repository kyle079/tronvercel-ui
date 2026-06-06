import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'default' | 'flush' | 'ghost';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

/** A content container — bordered surface, slightly elevated from the page. */
export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-line bg-surface',
        variant === 'default' && 'p-4 shadow-panel',
        variant === 'flush' && 'shadow-panel',
        variant === 'ghost' && 'border-transparent bg-transparent',
        className,
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function CardHeader({ title, description, actions, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 pb-3', className)} {...props}>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium text-fg">{title}</h3>
        {description != null && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      </div>
      {actions != null && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
    </div>
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-muted', className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-3 flex items-center gap-2 border-t border-line pt-3', className)}
      {...props}
    />
  );
}
