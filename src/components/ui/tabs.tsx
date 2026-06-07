<<<<<<< HEAD
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;
=======
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

export const TabsRoot = TabsPrimitive.Root;
>>>>>>> polecat/guzzle/tv-2m9@mq1xf69j

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
<<<<<<< HEAD
        'inline-flex h-9 items-center gap-0.5 rounded-md bg-surface p-1',
=======
        'flex items-end gap-0 border-b border-line',
>>>>>>> polecat/guzzle/tv-2m9@mq1xf69j
        className,
      )}
      {...props}
    />
  );
});

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
<<<<<<< HEAD
        'inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-sm font-medium',
        'text-muted transition-colors',
        'hover:text-fg',
        'data-[state=active]:bg-raised data-[state=active]:text-fg data-[state=active]:shadow-sm',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
=======
        'relative -mb-px border-b-2 border-transparent px-4 py-2 text-sm text-muted',
        'transition-colors outline-none',
        'hover:text-fg',
        'data-[state=active]:border-accent data-[state=active]:text-fg data-[state=active]:font-medium',
        'focus-visible:ring-1 focus-visible:ring-accent',
>>>>>>> polecat/guzzle/tv-2m9@mq1xf69j
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    />
  );
});

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
<<<<<<< HEAD
      className={cn(
        'mt-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded',
        className,
      )}
=======
      className={cn('outline-none', className)}
>>>>>>> polecat/guzzle/tv-2m9@mq1xf69j
      {...props}
    />
  );
});
