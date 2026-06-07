/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from './toast';
import type { Tone } from './badge';

interface ToastEntry {
  id: string;
  title: string;
  description?: string;
  tone?: Tone;
  duration?: number;
  open: boolean;
}

interface ToastManagerContextValue {
  toast: (opts: Omit<ToastEntry, 'id' | 'open'>) => void;
}

const ToastManagerContext = createContext<ToastManagerContextValue>({
  toast: () => undefined,
});

export function useToast() {
  return useContext(ToastManagerContext);
}

let _idCounter = 0;
function nextId() {
  _idCounter += 1;
  return `toast-${_idCounter}`;
}

/** Wrap your app in this provider to get `useToast()` from anywhere. */
export function ToastManager({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const toast = useCallback((opts: Omit<ToastEntry, 'id' | 'open'>) => {
    const id = nextId();
    setToasts((prev) => [...prev, { ...opts, id, open: true }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open: false } : t)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastManagerContext.Provider value={{ toast }}>
      <ToastProvider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            tone={t.tone}
            open={t.open}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
            duration={t.duration ?? 4000}
            onAnimationEnd={() => {
              if (!t.open) remove(t.id);
            }}
          >
            <div className="flex flex-col gap-0.5">
              <ToastTitle>{t.title}</ToastTitle>
              {t.description != null && (
                <ToastDescription>{t.description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastManagerContext.Provider>
  );
}
