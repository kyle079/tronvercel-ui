import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface KeyValueItem {
  label: ReactNode;
  value: ReactNode;
}

export interface KeyValueProps extends HTMLAttributes<HTMLDListElement> {
  items: KeyValueItem[];
  /** Stacked (label above value) or inline (label beside value). */
  layout?: 'stacked' | 'inline';
}

/** A definition list for displaying labeled metadata. */
export function KeyValue({ items, layout = 'inline', className, ...props }: KeyValueProps) {
  return (
    <dl
      className={cn(
        layout === 'inline' ? 'space-y-1' : 'space-y-2',
        className,
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            layout === 'inline'
              ? 'flex items-baseline gap-3'
              : 'flex flex-col gap-0.5',
          )}
        >
          <dt
            className={cn(
              'shrink-0 text-xs text-muted',
              layout === 'inline' && 'w-32',
            )}
          >
            {item.label}
          </dt>
          <dd className="min-w-0 text-sm text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: KeyValueItem[];
  cols?: 1 | 2 | 3;
}

/** A two-column grid description list for detail views. */
export function DescriptionList({ items, cols = 2, className, ...props }: DescriptionListProps) {
  const colClass = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-3' };
  return (
    <dl className={cn('grid gap-x-6 gap-y-3', colClass[cols], className)} {...props}>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <dt className="text-xs text-muted">{item.label}</dt>
          <dd className="text-sm text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
