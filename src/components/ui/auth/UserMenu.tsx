import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from './useAuth';

export interface UserMenuProps {
  className?: string;
  align?: 'left' | 'right';
}

export function UserMenu({ className, align = 'right' }: UserMenuProps) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full',
          'bg-accent/20 text-accent text-xs font-semibold',
          'border border-accent/40 transition-colors',
          'hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
        )}
        aria-label="User menu"
        aria-expanded={open}
      >
        {initials}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className={cn(
              'absolute z-20 mt-1 min-w-[180px] rounded border border-line bg-overlay py-1',
              'shadow-[0_16px_48px_-16px_rgb(0_0_0/0.75)]',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            <div className="px-3 py-2 border-b border-line">
              <p className="text-sm font-medium text-fg">{user.username}</p>
              {user.roles.length > 0 && (
                <p className="text-xs text-muted mt-0.5">{user.roles.join(', ')}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                void logout();
              }}
              className={cn(
                'w-full px-3 py-1.5 text-left text-sm text-muted',
                'hover:bg-raised hover:text-fg transition-colors',
              )}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
