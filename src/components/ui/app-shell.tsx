/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ShellContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const ShellContext = createContext<ShellContextValue>({
  sidebarOpen: true,
  setSidebarOpen: () => undefined,
  toggleSidebar: () => undefined,
});

export function useShell() {
  return useContext(ShellContext);
}

export interface AppShellProps {
  sidebar: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
  defaultSidebarOpen?: boolean;
  className?: string;
}

/** Root layout shell — fixed sidebar + optional topbar + scrollable content area. */
export function AppShell({
  sidebar,
  topbar,
  children,
  defaultSidebarOpen = true,
  className,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);

  return (
    <ShellContext.Provider
      value={{ sidebarOpen, setSidebarOpen, toggleSidebar: () => setSidebarOpen((v) => !v) }}
    >
      <div className={cn('flex h-screen overflow-hidden bg-base', className)}>
        {/* Sidebar */}
        <aside
          className={cn(
            'flex-shrink-0 overflow-hidden border-r border-line bg-surface transition-all duration-200',
            sidebarOpen ? 'w-[var(--sidebar-w)]' : 'w-0',
          )}
        >
          <div className="flex h-full w-[var(--sidebar-w)] flex-col">{sidebar}</div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {topbar}
          <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  footer?: ReactNode;
}

/** Sidebar container with logo slot, scrollable nav, and footer slot. */
export function Sidebar({ logo, footer, children, className, ...props }: SidebarProps) {
  return (
    <div className={cn('flex h-full flex-col', className)} {...props}>
      {logo != null && (
        <div className="flex h-[var(--topbar-h)] shrink-0 items-center border-b border-line px-4">
          {logo}
        </div>
      )}
      <nav className="min-h-0 flex-1 overflow-y-auto p-2">{children}</nav>
      {footer != null && (
        <div className="shrink-0 border-t border-line p-2">{footer}</div>
      )}
    </div>
  );
}

export interface NavGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

/** A labeled group of nav items. */
export function NavGroup({ label, children, className, ...props }: NavGroupProps) {
  return (
    <div className={cn('mb-3 space-y-0.5', className)} {...props}>
      {label != null && (
        <p className="mb-1 px-2 font-mono text-2xs uppercase tracking-widest text-faint">{label}</p>
      )}
      {children}
    </div>
  );
}

export interface NavItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  badge?: ReactNode;
  href?: string;
}

/** A single sidebar nav item. Render as `<a>` when `href` is given. */
export function NavItem({
  icon,
  label,
  active = false,
  badge,
  className,
  href,
  ...props
}: NavItemProps) {
  const cls = cn(
    'flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-sm transition-colors',
    active
      ? 'bg-accent/10 text-accent font-medium'
      : 'text-muted hover:bg-raised hover:text-fg',
    className,
  );

  if (href != null) {
    return (
      <a href={href} className={cls} aria-current={active ? 'page' : undefined}>
        {icon != null && (
          <span className={cn('shrink-0 text-base leading-none', active ? 'text-accent' : 'text-faint')}>
            {icon}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {badge}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      aria-current={active ? 'page' : undefined}
      {...(props as HTMLAttributes<HTMLButtonElement>)}
    >
      {icon != null && (
        <span className={cn('shrink-0 text-base leading-none', active ? 'text-accent' : 'text-faint')}>
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-left">{label}</span>
      {badge}
    </button>
  );
}

export interface TopbarProps extends HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  right?: ReactNode;
}

/** Fixed-height topbar with left/right slots. */
export function Topbar({ left, right, children, className, ...props }: TopbarProps) {
  return (
    <header
      className={cn(
        'flex h-[var(--topbar-h)] shrink-0 items-center justify-between border-b border-line bg-surface px-4 gap-4',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">{left ?? children}</div>
      {right != null && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </header>
  );
}
