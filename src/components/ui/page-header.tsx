import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: BreadcrumbItem[];
  actions?: ReactNode;
  /** Compact variant — tighter vertical padding. */
  compact?: boolean;
}

/** Page title area with breadcrumb, description, and action slot. */
export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  compact = false,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'border-b border-line bg-base',
        compact ? 'px-6 py-3' : 'px-6 py-5',
        className,
      )}
      {...props}
    >
      {breadcrumb != null && breadcrumb.length > 0 && (
        <nav className="mb-1.5 flex items-center gap-1 font-mono text-2xs text-faint">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-faint/50">/</span>}
              {item.href != null ? (
                <a href={item.href} className="hover:text-muted transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className={i === breadcrumb.length - 1 ? 'text-muted' : ''}>{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1
            className={cn(
              'font-medium text-fg',
              compact ? 'text-base' : 'text-lg',
            )}
          >
            {title}
          </h1>
          {description != null && (
            <p className="mt-0.5 text-sm text-muted">{description}</p>
          )}
        </div>
        {actions != null && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  right?: ReactNode;
}

/** A horizontal bar for search, filters, and bulk actions. */
export function Toolbar({ left, right, children, className, ...props }: ToolbarProps) {
  return (
    <div
      className={cn('flex items-center justify-between gap-3 px-4 py-2.5', className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">{left ?? children}</div>
      {right != null && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </div>
  );
}

/** A filter bar — typically holds search input + filter dropdowns. */
export function FilterBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border-b border-line bg-surface/50 px-4 py-2',
        className,
      )}
      {...props}
    />
  );
}
