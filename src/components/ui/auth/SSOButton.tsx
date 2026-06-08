import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { buttonClassName } from '../button-styles';

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
  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>Continue with {label}</span>
    </>
  );

  const classes = buttonClassName({
    variant: 'default',
    className: cn('w-full gap-2', className),
  });

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
