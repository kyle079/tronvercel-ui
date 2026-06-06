import { useState, useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import hljs from 'highlight.js/lib/core';
import { cn } from '@/lib/utils';

import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('go', go);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('text', plaintext);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('rs', rust);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);

// Tronvercel dark theme — injected once into <head>
const THEME_CSS = `
.tv-hljs .hljs-comment,.tv-hljs .hljs-meta{color:#5c676c;font-style:italic}
.tv-hljs .hljs-keyword,.tv-hljs .hljs-selector-tag,.tv-hljs .hljs-built_in,.tv-hljs .hljs-tag,.tv-hljs .hljs-name{color:#34c0d4}
.tv-hljs .hljs-attr,.tv-hljs .hljs-variable,.tv-hljs .hljs-template-variable{color:#8a969b}
.tv-hljs .hljs-string,.tv-hljs .hljs-doctag,.tv-hljs .hljs-regexp{color:#3fb950}
.tv-hljs .hljs-title,.tv-hljs .hljs-section{color:#58a6ff}
.tv-hljs .hljs-number,.tv-hljs .hljs-literal{color:#d29922}
.tv-hljs .hljs-type,.tv-hljs .hljs-class .hljs-title{color:#34c0d4}
.tv-hljs .hljs-deletion{color:#f85149}
.tv-hljs .hljs-addition{color:#3fb950}
.tv-hljs .hljs-link{color:#58a6ff;text-decoration:underline}
.tv-hljs .hljs-emphasis{font-style:italic}
.tv-hljs .hljs-strong{font-weight:700}
`;

let styleInjected = false;
function injectTheme() {
  if (styleInjected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.id = 'tv-hljs-theme';
  el.textContent = THEME_CSS;
  document.head.appendChild(el);
  styleInjected = true;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c
  ));
}

function highlight(code: string, language?: string): string {
  injectTheme();
  try {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value;
    }
    return hljs.highlightAuto(code).value;
  } catch {
    return escapeHtml(code);
  }
}

// ─── CopyButton ───────────────────────────────────────────────────────────────

function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied!' : 'Copy code to clipboard'}
      className={cn(
        'flex h-6 items-center gap-1 rounded border px-2 font-mono text-2xs',
        'transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
        copied
          ? 'border-ok/40 bg-ok/10 text-ok'
          : 'border-line bg-transparent text-muted hover:border-line-strong hover:text-fg',
        className,
      )}
    >
      {copied ? (
        <>
          <CheckIcon />
          copied
        </>
      ) : (
        <>
          <CopyIcon />
          copy
        </>
      )}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6.5L5 9.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="4.5" y="1.5" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7.5 1.5V1C7.5 0.724 7.276 0.5 7 0.5H1C0.724 0.5 0.5 0.724 0.5 1V9C0.5 9.276 0.724 9.5 1 9.5H4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// ─── <Code> — inline variant ──────────────────────────────────────────────────

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** Language hint for syntax highlighting. */
  language?: string;
}

/**
 * Inline code fragment with optional syntax highlighting.
 * Renders as a <code> element with Tronvercel mono styling.
 */
export function Code({ children, language, className, ...props }: CodeProps) {
  const raw = typeof children === 'string' ? children : '';
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (raw) setHtml(highlight(raw, language));
  }, [raw, language]);

  return (
    <code
      className={cn(
        'tv-hljs rounded bg-ink px-1.5 py-0.5 font-mono text-sm leading-none text-fg',
        className,
      )}
      {...(html
        ? { dangerouslySetInnerHTML: { __html: html } }
        : { children })}
      {...props}
    />
  );
}

// ─── <CodeSnippet> — block variant ───────────────────────────────────────────

export interface CodeSnippetProps extends HTMLAttributes<HTMLDivElement> {
  /** The code string to display. */
  code: string;
  /** Language for syntax highlighting. Auto-detected if omitted. */
  language?: string;
  /** Optional filename or title shown in the header bar. */
  filename?: ReactNode;
  /** Show line numbers. Defaults to false. */
  showLineNumbers?: boolean;
  /** Wrap long lines instead of scrolling. Defaults to false. */
  wrap?: boolean;
}

/**
 * A block code display with syntax highlighting, copy button, optional
 * filename header, optional line numbers, and scroll or wrap on long lines.
 */
export function CodeSnippet({
  code,
  language,
  filename,
  showLineNumbers = false,
  wrap = false,
  className,
  ...props
}: CodeSnippetProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(highlight(code, language));
  }, [code, language]);

  const hasHeader = filename != null || language != null;

  // Split highlighted HTML into per-line fragments for line numbers.
  // highlight.js guarantees all tags are closed at end of output, but may
  // span newlines — splitting is safe for visual display purposes.
  const lines = html ? html.split('\n') : escapeHtml(code).split('\n');
  // Remove trailing empty line artifact from trailing newline
  const displayLines = lines[lines.length - 1] === '' ? lines.slice(0, -1) : lines;

  return (
    <div
      className={cn('overflow-hidden rounded-md border border-line bg-ink', className)}
      {...props}
    >
      {/* ── Header bar ── */}
      {hasHeader && (
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-3 py-1.5">
          <div className="flex min-w-0 items-center gap-2">
            {filename != null && (
              <span className="truncate font-mono text-xs text-muted">{filename}</span>
            )}
            {language != null && (
              <span className="shrink-0 rounded border border-line px-1.5 font-mono text-2xs text-faint" style={{ textTransform: 'uppercase' }}>
                {language}
              </span>
            )}
          </div>
          <CopyButton text={code} />
        </div>
      )}

      {/* ── Code area ── */}
      <div className="relative">
        {!hasHeader && (
          <div className="absolute right-2 top-2 z-10">
            <CopyButton text={code} />
          </div>
        )}

        <div className={cn('overflow-x-auto', !hasHeader && 'pt-2')}>
          {showLineNumbers ? (
            <table className="w-full border-collapse" aria-label="Code block">
              <tbody>
                {displayLines.map((lineHtml, i) => (
                  <tr key={i} className="hover:bg-raised/30">
                    <td
                      className="select-none py-0 pl-4 pr-3 text-right align-top font-mono text-xs leading-relaxed text-faint"
                      style={{ width: '1%', whiteSpace: 'nowrap' }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </td>
                    <td
                      className={cn(
                        'tv-hljs py-0 pr-4 align-top font-mono text-xs leading-relaxed text-fg',
                        wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre',
                        i === 0 && 'pt-3',
                        i === displayLines.length - 1 && 'pb-3',
                      )}
                      dangerouslySetInnerHTML={{ __html: lineHtml }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <pre
              className={cn(
                'tv-hljs px-4 py-3 font-mono text-xs leading-relaxed text-fg',
                !hasHeader && 'pr-16',
                wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre',
              )}
              dangerouslySetInnerHTML={html ? { __html: html } : undefined}
            >
              {!html ? code : undefined}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
