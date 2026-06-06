import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const base =
  'w-full rounded border border-line bg-ink/60 px-2.5 py-1.5 text-sm text-fg ' +
  'placeholder:text-faint transition-colors duration-100 resize-y min-h-[80px] ' +
  'hover:border-line-strong focus:border-accent focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none ' +
  'disabled:opacity-40 disabled:pointer-events-none';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return <textarea ref={ref} className={cn(base, className)} {...props} />;
});
