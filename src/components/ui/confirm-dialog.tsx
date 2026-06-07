import { forwardRef, type ElementRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogClose = Dialog.Close;

export const DialogOverlay = forwardRef<
  ElementRef<typeof Dialog.Overlay>,
  ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <Dialog.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm',
        'data-[state=open]:animate-fade-in data-[state=closed]:opacity-0',
        className,
      )}
      {...props}
    />
  );
});

export const DialogContent = forwardRef<
  ElementRef<typeof Dialog.Content>,
  ComponentPropsWithoutRef<typeof Dialog.Content>
>(function DialogContent({ className, children, ...props }, ref) {
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <Dialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
          'rounded-lg border border-line bg-overlay shadow-overlay',
          'data-[state=open]:animate-scale-in data-[state=closed]:opacity-0',
          'focus:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
});

export const DialogTitle = forwardRef<
  ElementRef<typeof Dialog.Title>,
  ComponentPropsWithoutRef<typeof Dialog.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <Dialog.Title
      ref={ref}
      className={cn('text-sm font-medium text-fg', className)}
      {...props}
    />
  );
});

export const DialogDescription = forwardRef<
  ElementRef<typeof Dialog.Description>,
  ComponentPropsWithoutRef<typeof Dialog.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <Dialog.Description
      ref={ref}
      className={cn('text-xs text-muted', className)}
      {...props}
    />
  );
});

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Use 'danger' for destructive actions. */
  variant?: 'default' | 'danger';
  onConfirm: () => void;
  children?: ReactNode;
}

/** A modal dialog pre-wired for confirm / cancel interactions. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  children,
}: ConfirmDialogProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="p-5">
          <DialogTitle>{title}</DialogTitle>
          {description != null && (
            <DialogDescription className="mt-1">{description}</DialogDescription>
          )}
          {children != null && <div className="mt-3 text-sm text-muted">{children}</div>}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-3">
          <DialogClose asChild>
            <button
              type="button"
              className="rounded border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-fg"
            >
              {cancelLabel}
            </button>
          </DialogClose>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={cn(
              'rounded px-3 py-1.5 text-sm font-medium transition-colors',
              variant === 'danger'
                ? 'border border-danger/40 bg-transparent text-danger hover:bg-danger/10'
                : 'bg-accent text-accent-fg hover:bg-accent/90',
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}
