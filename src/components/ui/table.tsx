import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Scrollable wrapper with a flush border. */
export function TableRoot({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  );
}

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHead({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={cn('border-b border-line bg-raised/50 text-xs text-muted', className)}
        {...props}
      />
    );
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn('divide-y divide-line', className)} {...props} />;
  },
);

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn('transition-colors hover:bg-raised/60 data-[selected]:bg-accent/5', className)}
        {...props}
      />
    );
  },
);

export const TableTh = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  function TableTh({ className, ...props }, ref) {
    return (
      <th
        ref={ref}
        className={cn('px-3 py-2 text-left font-medium tracking-wide', className)}
        {...props}
      />
    );
  },
);

export const TableTd = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  function TableTd({ className, ...props }, ref) {
    return (
      <td
        ref={ref}
        className={cn('px-3 py-2 text-fg', className)}
        {...props}
      />
    );
  },
);

export const TableFoot = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableFoot({ className, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        className={cn('border-t border-line text-xs text-muted', className)}
        {...props}
      />
    );
  },
);
