import * as RadixRadio from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

export const RadioGroup = RadixRadio.Root;

export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadixRadio.Item> {}

export function RadioItem({ className, ...props }: RadioItemProps) {
  return (
    <RadixRadio.Item
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-line bg-ink/60 ' +
          'transition-colors duration-100 hover:border-line-strong ' +
          'focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none ' +
          'data-[state=checked]:border-accent ' +
          'disabled:opacity-40 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <RadixRadio.Indicator className="flex items-center justify-center">
        <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
      </RadixRadio.Indicator>
    </RadixRadio.Item>
  );
}
