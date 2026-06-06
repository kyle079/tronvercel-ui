import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Kbd } from './kbd';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  language?: string;
  /** Show a copy button. */
  copyable?: boolean;
}

/** A monospaced code block with optional language label. */
export function CodeBlock({
  language,
  copyable: _copyable,
  className,
  children,
  ...props
}: CodeBlockProps) {
  return (
    <div className="group relative overflow-hidden rounded-md border border-line bg-ink">
      {language != null && (
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-2xs text-faint">{language}</span>
        </div>
      )}
      <pre
        className={cn(
          'overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-fg',
          className,
        )}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

export interface KbdComboProps {
  keys: string[];
  separator?: string;
}

/** A keyboard shortcut combo — e.g. Cmd + K. */
export function KbdCombo({ keys, separator = '+' }: KbdComboProps) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((key, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-2xs text-faint">{separator}</span>}
          <Kbd>{key}</Kbd>
        </span>
      ))}
    </span>
  );
}
