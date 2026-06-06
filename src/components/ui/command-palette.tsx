import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  group?: string;
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandPaletteProps {
  /** Items to display. Can be grouped — use the `group` field. */
  items: CommandItem[];
  /** Placeholder text for the search input. */
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Register Cmd+K globally when true (default true). */
  globalShortcut?: boolean;
}

/** A Cmd+K command palette built on cmdk + Radix Dialog. */
export function CommandPalette({
  items,
  placeholder = 'Search commands…',
  open: controlledOpen,
  onOpenChange,
  globalShortcut = true,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!globalShortcut) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [globalShortcut, open, setOpen]);

  const groups = Array.from(new Set(items.map((i) => i.group ?? ''))).filter(Boolean);
  const ungrouped = items.filter((i) => !i.group);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-[20vh] z-50 w-full max-w-lg -translate-x-1/2',
            'rounded-lg border border-line bg-overlay shadow-overlay overflow-hidden',
            'data-[state=open]:animate-scale-in focus:outline-none',
          )}
          aria-label="Command palette"
        >
          <Command loop shouldFilter>
            <div className="flex items-center border-b border-line px-3">
              <span className="shrink-0 text-muted text-sm mr-2">⌘</span>
              <Command.Input
                placeholder={placeholder}
                className={cn(
                  'flex-1 bg-transparent py-3 text-sm text-fg placeholder:text-faint',
                  'outline-none',
                )}
              />
            </div>
            <Command.List className="max-h-[360px] overflow-y-auto p-1.5">
              <Command.Empty className="py-8 text-center text-xs text-faint">
                No results found.
              </Command.Empty>

              {ungrouped.map((item) => (
                <CommandPaletteItem
                  key={item.id}
                  item={item}
                  onSelect={() => {
                    item.onSelect();
                    setOpen(false);
                  }}
                />
              ))}

              {groups.map((group) => (
                <Command.Group
                  key={group}
                  heading={
                    <span className="px-2 py-1.5 font-mono text-2xs uppercase tracking-widest text-faint">
                      {group}
                    </span>
                  }
                >
                  {items
                    .filter((i) => i.group === group)
                    .map((item) => (
                      <CommandPaletteItem
                        key={item.id}
                        item={item}
                        onSelect={() => {
                          item.onSelect();
                          setOpen(false);
                        }}
                      />
                    ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CommandPaletteItem({
  item,
  onSelect,
}: {
  item: CommandItem;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={[item.label, ...(item.keywords ?? [])].join(' ')}
      onSelect={onSelect}
      className={cn(
        'flex items-center gap-3 rounded px-3 py-2 text-sm text-muted cursor-pointer',
        'data-[selected=true]:bg-raised data-[selected=true]:text-fg',
        'transition-colors',
      )}
    >
      {item.icon != null && (
        <span className="shrink-0 text-base leading-none">{item.icon}</span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.description != null && (
        <span className="shrink-0 text-xs text-faint">{item.description}</span>
      )}
    </Command.Item>
  );
}
