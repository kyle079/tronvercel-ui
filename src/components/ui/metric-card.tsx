import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { Tone } from './badge';

const toneFg: Record<Tone, string> = {
  neutral: 'text-fg',
  accent: 'text-accent',
  ok: 'text-ok',
  warn: 'text-warn',
  danger: 'text-danger',
  info: 'text-info',
};

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  /** Secondary value or comparison (e.g., "+12% vs last week"). */
  sub?: ReactNode;
  /** Decorative prefix/suffix (e.g., a small icon). */
  icon?: ReactNode;
  tone?: Tone;
}

/** A stat card — label + large value + optional trend line. */
export function MetricCard({
  label,
  value,
  sub,
  icon,
  tone = 'neutral',
  className,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-line bg-surface p-4 shadow-panel',
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-muted">{label}</p>
        {icon != null && <span className="shrink-0 text-muted">{icon}</span>}
      </div>
      <p className={cn('mt-1.5 text-2xl font-semibold tabular-nums', toneFg[tone])}>
        {value}
      </p>
      {sub != null && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

export interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
  stats: Array<{
    label: string;
    value: ReactNode;
    sub?: ReactNode;
    tone?: Tone;
  }>;
  cols?: 2 | 3 | 4;
}

/** A horizontal row of MetricCards. */
export function StatBlock({ stats, cols = 3, className, ...props }: StatBlockProps) {
  const colClass = { 2: 'grid-cols-2', 3: 'grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-2 lg:grid-cols-4' };
  return (
    <div className={cn('grid gap-3', colClass[cols], className)} {...props}>
      {stats.map((s, i) => (
        <MetricCard key={i} label={s.label} value={s.value} sub={s.sub} tone={s.tone} />
      ))}
    </div>
  );
}
