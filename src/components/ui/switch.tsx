import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

export type SwitchProps = React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <RadixSwitch.Root
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent ' +
          'bg-raised transition-colors duration-150 ' +
          'focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none ' +
          'data-[state=checked]:bg-accent ' +
          'disabled:opacity-40 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <RadixSwitch.Thumb
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-fg shadow-sm ' +
            'transition-transform duration-150 ' +
            'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )}
      />
    </RadixSwitch.Root>
  );
}
