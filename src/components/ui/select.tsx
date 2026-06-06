import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Select = RadixSelect.Root;
export const SelectGroup = RadixSelect.Group;
export const SelectValue = RadixSelect.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>) {
  return (
    <RadixSelect.Trigger
      className={cn(
        'flex h-8 w-full items-center justify-between gap-2 rounded border border-line bg-ink/60 px-2.5 text-sm text-fg ' +
          'placeholder:text-faint transition-colors duration-100 ' +
          'hover:border-line-strong focus:border-accent focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none ' +
          'disabled:opacity-40 disabled:pointer-events-none data-[placeholder]:text-faint',
        className,
      )}
      {...props}
    >
      {children}
      <RadixSelect.Icon asChild>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSelect.Content>) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={cn(
          'relative z-50 min-w-[8rem] overflow-hidden rounded border border-line bg-overlay shadow-overlay ' +
            'data-[state=open]:animate-scale-in',
          position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <RadixSelect.ScrollUpButton className="flex h-6 items-center justify-center text-muted">
          <ChevronUp className="h-3.5 w-3.5" />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="flex h-6 items-center justify-center text-muted">
          <ChevronDown className="h-3.5 w-3.5" />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSelect.Label>) {
  return (
    <RadixSelect.Label
      className={cn('px-2 py-1 text-2xs font-medium text-faint uppercase tracking-wider', className)}
      {...props}
    />
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSelect.Item>) {
  return (
    <RadixSelect.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded py-1.5 pl-7 pr-2 text-sm text-fg outline-none ' +
          'focus:bg-raised focus:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <RadixSelect.ItemIndicator>
          <Check className="h-3.5 w-3.5 text-accent" />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}

export function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>) {
  return <RadixSelect.Separator className={cn('-mx-1 my-1 h-px bg-line', className)} {...props} />;
}
