import {
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { TableRoot, TableHead, TableBody, TableRow, TableTh, TableTd } from './table';
import { Skeleton } from './skeleton';
import { Pagination } from './pagination';

export type SortDir = 'asc' | 'desc';

export interface ColumnDef<T> {
  key: string;
  header: ReactNode;
  cell: (row: T, index: number) => ReactNode;
  /** Enable column-level sort. */
  sortable?: boolean;
  /** Tailwind width class, e.g. "w-32". */
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  /** Unique key extractor — falls back to row index if omitted. */
  rowKey?: (row: T, index: number) => string | number;
  /** Mark a row as selected. */
  isSelected?: (row: T) => boolean;
  onRowClick?: (row: T) => void;
  /** Controlled sort state. */
  sortKey?: string;
  sortDir?: SortDir;
  onSort?: (key: string, dir: SortDir) => void;
  /** Controlled pagination. Pass `undefined` to hide pagination. */
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  skeletonRows?: number;
  /** Shown when data is empty and not loading. */
  emptySlot?: ReactNode;
  className?: string;
  stickyHeader?: boolean;
}

function SortIcon({ dir }: { dir?: SortDir }) {
  if (dir === 'asc') return <span className="ml-1 text-accent">↑</span>;
  if (dir === 'desc') return <span className="ml-1 text-accent">↓</span>;
  return <span className="ml-1 text-faint opacity-0 group-hover:opacity-100">↕</span>;
}

/** A full-featured sortable, filterable, paginated data table built on Table primitives. */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  isSelected,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
  page = 1,
  totalPages,
  onPageChange,
  loading = false,
  skeletonRows = 5,
  emptySlot,
  className,
  stickyHeader = false,
}: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDir } | null>(null);

  const effectiveSortKey = sortKey ?? internalSort?.key;
  const effectiveSortDir = sortDir ?? internalSort?.dir;

  const handleSort = useCallback(
    (col: ColumnDef<T>) => {
      if (!col.sortable) return;
      const nextDir: SortDir =
        effectiveSortKey === col.key && effectiveSortDir === 'asc' ? 'desc' : 'asc';
      if (onSort) {
        onSort(col.key, nextDir);
      } else {
        setInternalSort({ key: col.key, dir: nextDir });
      }
    },
    [effectiveSortKey, effectiveSortDir, onSort],
  );

  const sortedData = useMemo(() => {
    if (!internalSort || onSort) return data;
    const { key, dir } = internalSort;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[key];
      const bv = (b as Record<string, unknown>)[key];
      const cmp =
        typeof av === 'string' && typeof bv === 'string'
          ? av.localeCompare(bv)
          : (av as number) < (bv as number)
            ? -1
            : (av as number) > (bv as number)
              ? 1
              : 0;
      return dir === 'asc' ? cmp : -cmp;
    });
  }, [data, internalSort, onSort]);

  const showPagination = onPageChange != null && totalPages != null && totalPages > 1;

  const isEmpty = sortedData.length === 0 && !loading;

  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' };

  return (
    <div className={cn('flex flex-col', className)}>
      <TableRoot>
        <TableHead className={cn(stickyHeader && 'sticky top-0 z-10')}>
          <tr>
            {columns.map((col) => (
              <TableTh
                key={col.key}
                className={cn(
                  col.width,
                  col.align && alignClass[col.align],
                  col.sortable && 'group cursor-pointer select-none',
                )}
                onClick={() => handleSort(col)}
              >
                <span className="inline-flex items-center">
                  {col.header}
                  {col.sortable && (
                    <SortIcon
                      dir={effectiveSortKey === col.key ? effectiveSortDir : undefined}
                    />
                  )}
                </span>
              </TableTh>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: skeletonRows }, (_, i) => (
                <TableRow key={i} aria-hidden="true">
                  {columns.map((col) => (
                    <TableTd key={col.key}>
                      <Skeleton className="h-3 w-full max-w-[140px]" />
                    </TableTd>
                  ))}
                </TableRow>
              ))
            : sortedData.map((row, i) => {
                const key = rowKey ? rowKey(row, i) : i;
                const selected = isSelected ? isSelected(row) : false;
                return (
                  <TableRow
                    key={key}
                    data-selected={selected || undefined}
                    className={cn(onRowClick && 'cursor-pointer')}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <TableTd
                        key={col.key}
                        className={col.align ? alignClass[col.align] : undefined}
                      >
                        {col.cell(row, i)}
                      </TableTd>
                    ))}
                  </TableRow>
                );
              })}
        </TableBody>
      </TableRoot>

      {isEmpty && (
        <div className="flex min-h-[120px] flex-col items-center justify-center border-t border-line p-8 text-sm text-muted">
          {emptySlot ?? 'No results.'}
        </div>
      )}

      {showPagination && (
        <div className="border-t border-line px-4 py-2">
          <Pagination
            page={page}
            totalPages={totalPages!}
            onPageChange={onPageChange!}
          />
        </div>
      )}
    </div>
  );
}
