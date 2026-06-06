import { forwardRef, type ElementRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

export const DropdownRoot = DropdownMenu.Root;
export const DropdownTrigger = DropdownMenu.Trigger;
export const DropdownSub = DropdownMenu.Sub;
export const DropdownSubTrigger = DropdownMenu.SubTrigger;
export const DropdownPortal = DropdownMenu.Portal;
export const DropdownRadioGroup = DropdownMenu.RadioGroup;

const contentBase = cn(
  'z-50 min-w-[160px] overflow-hidden rounded-md border border-line bg-overlay p-1 shadow-overlay',
  'data-[state=open]:animate-scale-in',
);

export const DropdownContent = forwardRef<
  ElementRef<typeof DropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(function DropdownContent({ className, sideOffset = 4, align = 'start', ...props }, ref) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(contentBase, className)}
        {...props}
      />
    </DropdownMenu.Portal>
  );
});

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Item> & { danger?: boolean; icon?: ReactNode }
>(function DropdownItem({ className, danger, icon, children, ...props }, ref) {
  return (
    <DropdownMenu.Item
      ref={ref}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none transition-colors',
        'focus:bg-raised focus:text-fg',
        danger ? 'text-danger focus:bg-danger/10' : 'text-muted',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className,
      )}
      {...props}
    >
      {icon != null && <span className="shrink-0 text-base leading-none">{icon}</span>}
      {children}
    </DropdownMenu.Item>
  );
});

export const DropdownLabel = forwardRef<
  ElementRef<typeof DropdownMenu.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Label>
>(function DropdownLabel({ className, ...props }, ref) {
  return (
    <DropdownMenu.Label
      ref={ref}
      className={cn('px-2 py-1 font-mono text-2xs uppercase tracking-widest text-faint', className)}
      {...props}
    />
  );
});

export const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(function DropdownSeparator({ className, ...props }, ref) {
  return (
    <DropdownMenu.Separator
      ref={ref}
      className={cn('my-1 h-px bg-line', className)}
      {...props}
    />
  );
});

export const DropdownCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenu.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenu.CheckboxItem>
>(function DropdownCheckboxItem({ className, children, ...props }, ref) {
  return (
    <DropdownMenu.CheckboxItem
      ref={ref}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-muted outline-none transition-colors',
        'focus:bg-raised focus:text-fg',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className,
      )}
      {...props}
    >
      <DropdownMenu.ItemIndicator>
        <span className="text-accent text-xs">✓</span>
      </DropdownMenu.ItemIndicator>
      {children}
    </DropdownMenu.CheckboxItem>
  );
});

export const DropdownRadioItem = forwardRef<
  ElementRef<typeof DropdownMenu.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenu.RadioItem>
>(function DropdownRadioItem({ className, children, ...props }, ref) {
  return (
    <DropdownMenu.RadioItem
      ref={ref}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-muted outline-none transition-colors',
        'focus:bg-raised focus:text-fg',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className,
      )}
      {...props}
    >
      <DropdownMenu.ItemIndicator>
        <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
      </DropdownMenu.ItemIndicator>
      {children}
    </DropdownMenu.RadioItem>
  );
});
