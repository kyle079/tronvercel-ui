import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
import type { Tone } from './badge';

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        'fixed bottom-4 right-4 z-[100] flex max-h-screen w-80 flex-col gap-2',
        className,
      )}
      {...props}
    />
  );
});

const toneBorder: Record<Tone, string> = {
  neutral: 'border-line',
  accent: 'border-accent/30',
  ok: 'border-ok/30',
  warn: 'border-warn/30',
  danger: 'border-danger/30',
  info: 'border-info/30',
};

const toneIcon: Record<Tone, string> = {
  neutral: 'text-muted',
  accent: 'text-accent',
  ok: 'text-ok',
  warn: 'text-warn',
  danger: 'text-danger',
  info: 'text-info',
};

export interface ToastProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  tone?: Tone;
}

export const Toast = forwardRef<ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  function Toast({ className, tone = 'neutral', ...props }, ref) {
    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(
          'pointer-events-auto relative flex w-full items-start gap-3',
          'rounded-md border bg-overlay px-3 py-2.5 shadow-overlay',
          'data-[state=open]:animate-scale-in',
          'data-[state=closed]:opacity-0 data-[state=closed]:transition-opacity data-[state=closed]:duration-150',
          'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:transition-transform',
          'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
          toneBorder[tone],
          className,
        )}
        {...props}
      />
    );
  },
);

export const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitive.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Title> & { tone?: Tone }
>(function ToastTitle({ className, tone = 'neutral', ...props }, ref) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn('text-sm font-medium', toneIcon[tone], className)}
      {...props}
    />
  );
});

export const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitive.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn('mt-0.5 text-xs text-muted', className)}
      {...props}
    />
  );
});

export const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitive.Close>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(function ToastClose({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      toast-close=""
      aria-label="Dismiss"
      className={cn(
        'ml-auto self-start rounded p-0.5 text-faint transition-colors hover:text-fg',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="block h-3.5 w-3.5 leading-none text-center text-xs">
        ✕
      </span>
    </ToastPrimitive.Close>
  );
});

export const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitive.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(function ToastAction({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      className={cn(
        'mt-2 inline-flex h-6 items-center rounded border border-line bg-raised px-2 text-xs text-fg',
        'transition-colors hover:bg-line focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
        className,
      )}
      {...props}
    />
  );
});
