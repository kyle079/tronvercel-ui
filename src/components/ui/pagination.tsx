import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Current page (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  onPageChange: (page: number) => void;
}

const btnBase =
  'inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded border px-1.5 font-mono text-xs ' +
  'transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ' +
  'disabled:pointer-events-none disabled:opacity-40';

export function Pagination({ page, totalPages, onPageChange, className, ...props }: PaginationProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className={cn(btnBase, 'border-line bg-surface text-muted hover:bg-raised hover:text-fg')}
      >
        ‹
      </button>

      <PaginationItems page={page} totalPages={totalPages} onPageChange={onPageChange} />

      <button
        type="button"
        aria-label="Next page"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className={cn(btnBase, 'border-line bg-surface text-muted hover:bg-raised hover:text-fg')}
      >
        ›
      </button>
    </nav>
  );
}

function PaginationItems({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = buildPageItems(page, totalPages);

  return (
    <>
      {pages.map((item, idx) =>
        item === '…' ? (
          <span key={`ellipsis-${idx}`} className="px-1 font-mono text-xs text-faint select-none">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item as number)}
            className={cn(
              btnBase,
              item === page
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-line bg-surface text-muted hover:bg-raised hover:text-fg',
            )}
          >
            {item}
          </button>
        ),
      )}
    </>
  );
}

function buildPageItems(current: number, total: number): (number | '…')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | '…')[] = [1];
  if (current > 3) pages.push('…');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}
