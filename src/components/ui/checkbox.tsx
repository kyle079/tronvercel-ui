import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  indeterminate?: boolean;
}

export function Checkbox({ className, indeterminate, ...props }: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-line bg-ink/60 ' +
          'transition-colors duration-100 hover:border-line-strong ' +
          'focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none ' +
          'data-[state=checked]:border-accent data-[state=checked]:bg-accent ' +
          'data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent ' +
          'disabled:opacity-40 disabled:pointer-events-none',
        className,
      )}
      checked={indeterminate ? 'indeterminate' : props.checked}
      {...props}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center text-accent-fg">
        {indeterminate ? (
          <Minus className="h-3 w-3" strokeWidth={3} />
        ) : (
          <Check className="h-3 w-3" strokeWidth={3} />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
