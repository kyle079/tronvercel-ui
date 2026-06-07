import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Vertical stack with consistent spacing. */
export function Stack({
  gap = 'md',
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) {
  const gaps = { xs: 'space-y-1', sm: 'space-y-2', md: 'space-y-4', lg: 'space-y-6', xl: 'space-y-8' };
  return <div className={cn('flex flex-col', gaps[gap], className)} {...props} />;
}

/** Horizontal inline group. */
export function Inline({
  gap = 'md',
  align = 'center',
  wrap = false,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
}) {
  const gaps = { xs: 'gap-1', sm: 'gap-2', md: 'gap-3', lg: 'gap-4' };
  const aligns = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' };
  return (
    <div
      className={cn('flex', gaps[gap], aligns[align], wrap && 'flex-wrap', className)}
      {...props}
    />
  );
}

/** Responsive CSS grid. */
export function Grid({
  cols = 2,
  gap = 'md',
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
}) {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };
  const gaps = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };
  return <div className={cn('grid', colMap[cols], gaps[gap], className)} {...props} />;
}

/** A labeled content section with optional title and divider. */
export function Section({
  title,
  description,
  actions,
  divider = false,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <section className={cn('space-y-3', divider && 'border-t border-line pt-4', className)} {...props}>
      {(title != null || actions != null) && (
        <div className="flex items-start justify-between gap-3">
          <div>
            {title != null && <h3 className="text-sm font-medium text-fg">{title}</h3>}
            {description != null && <p className="mt-0.5 text-xs text-muted">{description}</p>}
          </div>
          {actions != null && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

