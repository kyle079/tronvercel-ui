import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface AuthCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  logo?: ReactNode;
}

export function AuthCard({ title, subtitle, children, className, logo }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base p-4">
      <div
        className={cn(
          'w-full max-w-sm rounded-lg border border-line bg-surface p-8',
          'shadow-[0_1px_0_0_rgb(var(--c-line)/0.6),0_8px_24px_-12px_rgb(0_0_0/0.6)]',
          className,
        )}
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          {logo && <div className="mb-1">{logo}</div>}
          {title && (
            <h1 className="text-lg font-semibold tracking-tight text-fg">{title}</h1>
          )}
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
