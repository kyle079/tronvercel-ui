import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardBody, CardFooter, CardHeader } from './card';
import { StatusPill, type Tone } from './badge';

export interface OperatorSummaryMetric {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  tone?: Tone;
}

export interface OperatorSummaryDetail {
  label: string;
  value: ReactNode;
}

export interface OperatorSummaryData {
  title: ReactNode;
  statusLabel: string;
  statusTone?: Tone;
  statusPulse?: boolean;
  eyebrow?: ReactNode;
  summary?: ReactNode;
  updatedAt?: ReactNode;
  metrics?: OperatorSummaryMetric[];
  details?: OperatorSummaryDetail[];
  actions?: ReactNode;
  footer?: ReactNode;
}

export interface OperatorSummaryCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, OperatorSummaryData {}

const metricTone: Record<Tone, string> = {
  neutral: 'text-fg',
  accent: 'text-accent',
  ok: 'text-ok',
  warn: 'text-warn',
  danger: 'text-danger',
  info: 'text-info',
};

/**
 * Mobile-first status summary card for operator workflows.
 * Composes title, state, key metrics, and lightweight metadata into a single surface.
 */
export function OperatorSummaryCard({
  title,
  statusLabel,
  statusTone = 'neutral',
  statusPulse = false,
  eyebrow,
  summary,
  updatedAt,
  metrics = [],
  details = [],
  actions,
  footer,
  className,
  ...props
}: OperatorSummaryCardProps) {
  const hasMeta = eyebrow != null || updatedAt != null;
  const hasFooter = footer != null || actions != null;

  return (
    <Card className={cn('w-full max-w-sm', className)} {...props}>
      <CardHeader
        title={
          <div className="space-y-1">
            {eyebrow != null && <p className="font-mono text-2xs uppercase tracking-[0.2em] text-faint">{eyebrow}</p>}
            <span>{title}</span>
          </div>
        }
        description={
          <div className="space-y-1">
            <StatusPill tone={statusTone} pulse={statusPulse} label={statusLabel} />
            {summary != null && <p className="max-w-[28ch] text-xs text-muted">{summary}</p>}
          </div>
        }
        actions={updatedAt != null ? <span className="font-mono text-2xs text-faint">{updatedAt}</span> : undefined}
      />

      <CardBody className="space-y-3">
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-md border border-line bg-base/60 px-3 py-2"
              >
                <p className="text-2xs uppercase tracking-wide text-faint">{metric.label}</p>
                <p className={cn('mt-1 text-base font-semibold tabular-nums', metricTone[metric.tone ?? 'neutral'])}>
                  {metric.value}
                </p>
                {metric.detail != null && <p className="mt-1 text-2xs text-muted">{metric.detail}</p>}
              </div>
            ))}
          </div>
        )}

        {details.length > 0 && (
          <dl className="space-y-2 border-t border-line pt-3">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start justify-between gap-3">
                <dt className="text-xs text-muted">{detail.label}</dt>
                <dd className="text-right text-xs text-fg">{detail.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {!hasMeta && summary == null && metrics.length === 0 && details.length === 0 && (
          <p className="text-xs text-muted">No summary data available.</p>
        )}
      </CardBody>

      {hasFooter && (
        <CardFooter className="items-start justify-between gap-3">
          <div className="min-w-0 flex-1 text-xs text-muted">{footer}</div>
          {actions != null && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </CardFooter>
      )}
    </Card>
  );
}

export interface OperatorSummaryStackProps extends HTMLAttributes<HTMLDivElement> {
  items: OperatorSummaryData[];
}

/** Stacks mobile operator summaries into a compact feed. */
export function OperatorSummaryStack({ items, className, ...props }: OperatorSummaryStackProps) {
  return (
    <div className={cn('flex w-full flex-col gap-3', className)} {...props}>
      {items.map((item, index) => (
        <OperatorSummaryCard
          key={index}
          {...item}
          className="max-w-none"
        />
      ))}
    </div>
  );
}
