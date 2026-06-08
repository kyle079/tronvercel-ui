import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'default' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'icon';

const base =
  'inline-flex items-center justify-center gap-2 rounded font-medium whitespace-nowrap ' +
  'transition-colors duration-100 select-none disabled:opacity-40 disabled:pointer-events-none ' +
  'focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent/90 active:bg-accent/80',
  default: 'bg-surface text-fg border border-line hover:bg-raised hover:border-line-strong',
  ghost: 'text-muted hover:text-fg hover:bg-raised',
  danger: 'bg-transparent text-danger border border-danger/40 hover:bg-danger/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-8 px-3 text-sm',
  icon: 'h-8 w-8 p-0 text-sm',
};

export function buttonClassName({
  className,
  variant = 'default',
  size = 'md',
}: {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return cn(base, variants[variant], sizes[size], className);
}
