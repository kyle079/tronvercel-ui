import {
  forwardRef,
  useId,
  type FormEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { StatusDot, type Tone } from './badge';

export type TerminalStatus = 'connected' | 'connecting' | 'disconnected' | 'error' | 'empty';

export interface TerminalLine {
  id?: string;
  content: ReactNode;
  kind?: 'input' | 'output' | 'system' | 'error' | 'success';
}

const statusTone: Record<TerminalStatus, Tone> = {
  connected: 'ok',
  connecting: 'warn',
  disconnected: 'neutral',
  error: 'danger',
  empty: 'info',
};

const statusLabel: Record<TerminalStatus, string> = {
  connected: 'connected',
  connecting: 'connecting',
  disconnected: 'offline',
  error: 'error',
  empty: 'idle',
};

const lineKindClass: Record<NonNullable<TerminalLine['kind']>, string> = {
  input: 'text-accent',
  output: 'text-fg',
  system: 'text-muted',
  error: 'text-danger',
  success: 'text-ok',
};

export interface TerminalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'title'> {
  title?: ReactNode;
  status?: TerminalStatus;
  statusText?: ReactNode;
  actions?: ReactNode;
  lines?: TerminalLine[];
  empty?: ReactNode;
  prompt?: ReactNode;
  commandValue?: string;
  commandPlaceholder?: string;
  inputDisabled?: boolean;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'disabled'>;
  onCommandChange?: (value: string) => void;
  onCommandSubmit?: (value: string) => void;
  height?: 'sm' | 'md' | 'lg' | 'viewport';
  wrap?: boolean;
  resizable?: boolean;
  autoComplete?: string;
}

const heightClass: Record<NonNullable<TerminalProps['height']>, string> = {
  sm: 'min-h-[220px] max-h-[min(420px,70dvh)]',
  md: 'min-h-[320px] max-h-[min(560px,78dvh)]',
  lg: 'min-h-[420px] max-h-[min(720px,84dvh)]',
  viewport: 'min-h-[min(420px,calc(100dvh-2rem))] max-h-[calc(100dvh-2rem)]',
};

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(function Terminal(
  {
    title = 'Terminal',
    status = 'disconnected',
    statusText,
    actions,
    lines,
    empty = 'No terminal output yet.',
    prompt = '$',
    commandValue,
    commandPlaceholder = 'Type a command',
    inputDisabled,
    inputProps,
    onCommandChange,
    onCommandSubmit,
    height = 'md',
    wrap = true,
    resizable = true,
    autoComplete = 'off',
    className,
    ...props
  },
  ref,
) {
  const inputId = useId();
  const isEmpty = lines == null || lines.length === 0;
  const disabled = inputDisabled ?? (status === 'connecting' || status === 'error');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || onCommandSubmit == null || commandValue == null || commandValue.trim() === '') {
      return;
    }
    onCommandSubmit(commandValue);
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-line bg-ink shadow-panel',
        heightClass[height],
        resizable && 'resize-y',
        className,
      )}
      {...props}
    >
      <TerminalHeader title={title} status={status} statusText={statusText} actions={actions} />
      <TerminalViewport wrap={wrap} aria-live={status === 'connecting' ? 'polite' : undefined}>
        {isEmpty ? (
          <TerminalEmpty>{empty}</TerminalEmpty>
        ) : (
          lines.map((line, index) => (
            <TerminalOutputLine key={line.id ?? index} kind={line.kind}>
              {line.content}
            </TerminalOutputLine>
          ))
        )}
      </TerminalViewport>
      <TerminalInputForm onSubmit={handleSubmit}>
        <label htmlFor={inputId} className="sr-only">
          Terminal command
        </label>
        <TerminalPrompt>{prompt}</TerminalPrompt>
        <input
          id={inputId}
          value={commandValue}
          onChange={(event) => onCommandChange?.(event.currentTarget.value)}
          disabled={disabled}
          placeholder={commandPlaceholder}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete={autoComplete}
          enterKeyHint="send"
          className={cn(
            'h-10 min-w-0 flex-1 bg-transparent font-mono text-sm text-fg caret-accent outline-none',
            'placeholder:text-faint disabled:cursor-not-allowed disabled:text-faint',
          )}
          {...inputProps}
        />
      </TerminalInputForm>
    </div>
  );
});

export interface TerminalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  status?: TerminalStatus;
  statusText?: ReactNode;
  actions?: ReactNode;
}

export function TerminalHeader({
  title,
  status = 'disconnected',
  statusText,
  actions,
  className,
  ...props
}: TerminalHeaderProps) {
  return (
    <div
      className={cn(
        'flex min-h-10 items-center justify-between gap-3 border-b border-line bg-surface px-3',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate text-sm font-medium text-fg">{title}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-2xs text-muted">
          <StatusDot tone={statusTone[status]} pulse={status === 'connecting'} />
          <span className="max-w-[7rem] truncate sm:max-w-none">
            {statusText ?? statusLabel[status]}
          </span>
        </span>
      </div>
      {actions != null && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
    </div>
  );
}

export interface TerminalViewportProps extends HTMLAttributes<HTMLDivElement> {
  wrap?: boolean;
}

export const TerminalViewport = forwardRef<HTMLDivElement, TerminalViewportProps>(
  function TerminalViewport({ wrap = true, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 font-mono text-xs leading-relaxed',
          wrap ? 'overflow-x-hidden [overflow-wrap:anywhere] whitespace-pre-wrap' : 'overflow-x-auto whitespace-pre',
          className,
        )}
        {...props}
      />
    );
  },
);

export interface TerminalOutputLineProps extends HTMLAttributes<HTMLDivElement> {
  kind?: TerminalLine['kind'];
}

export function TerminalOutputLine({
  kind = 'output',
  className,
  ...props
}: TerminalOutputLineProps) {
  return (
    <div
      className={cn('min-h-5 min-w-0', lineKindClass[kind], className)}
      role={kind === 'error' ? 'alert' : undefined}
      {...props}
    />
  );
}

export function TerminalEmpty({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex min-h-full items-center justify-center px-2 py-8 text-center text-sm text-faint',
        className,
      )}
      {...props}
    />
  );
}

export function TerminalInputForm({ className, ...props }: HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn(
        'flex min-h-11 items-center gap-2 border-t border-line bg-surface px-3',
        'pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2 sm:min-h-10 sm:py-0',
        className,
      )}
      {...props}
    />
  );
}

export function TerminalPrompt({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('shrink-0 select-none font-mono text-sm text-accent', className)}
      aria-hidden="true"
      {...props}
    />
  );
}
