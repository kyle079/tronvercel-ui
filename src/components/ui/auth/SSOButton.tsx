import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../button';

export interface SSOButtonProps {
  /** Provider name shown on the button, e.g. "Single Sign-On" */
  label: string;
  /** URL to redirect to for SSO initiation. Default: '/auth/sso' */
  href?: string;
  /** Optional provider icon */
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function SSOButton({
  label,
  href = '/auth/sso',
  icon,
  disabled,
  className,
}: SSOButtonProps) {
  return (
    <a
      href={disabled ? undefined : href}
      className={cn('block', disabled && 'pointer-events-none opacity-40')}
      aria-disabled={disabled}
    >
      <Button
        type="button"
        variant="default"
        className={cn('w-full gap-2', className)}
        disabled={disabled}
        tabIndex={-1}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>Continue with {label}</span>
      </Button>
    </a>
  );
}
