import type { Config } from 'tailwindcss';

/**
 * Tronvercel UI design tokens.
 *
 * Ported verbatim from the Gas Town design system.
 * Visual direction: Vercel-grade restraint with a RESTRAINED TRON influence —
 * dark, geometric, precise, technical legibility. NO neon glow, NO cyberpunk.
 * Colors are exposed as `R G B` channel triples in CSS variables (see styles/tokens.css)
 * so Tailwind's `/<alpha>` opacity modifiers work everywhere.
 */
const channel = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',

      ink: channel('--c-ink'),
      base: channel('--c-base'),
      surface: channel('--c-surface'),
      raised: channel('--c-raised'),
      overlay: channel('--c-overlay'),

      line: channel('--c-line'),
      'line-strong': channel('--c-line-strong'),

      fg: channel('--c-fg'),
      muted: channel('--c-muted'),
      faint: channel('--c-faint'),

      accent: channel('--c-accent'),
      'accent-fg': channel('--c-accent-fg'),
      'accent-dim': channel('--c-accent-dim'),

      ok: channel('--c-ok'),
      warn: channel('--c-warn'),
      danger: channel('--c-danger'),
      info: channel('--c-info'),
    },
    borderRadius: {
      none: '0',
      sm: '3px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      full: '9999px',
    },
    fontFamily: {
      sans: ['InterVariable', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      mono: [
        'JetBrains Mono',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Consolas',
        'monospace',
      ],
    },
    extend: {
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
      },
      ringWidth: {
        DEFAULT: '1px',
      },
      ringColor: {
        DEFAULT: channel('--c-accent'),
      },
      boxShadow: {
        panel: '0 1px 0 0 rgb(var(--c-line) / 0.6), 0 8px 24px -12px rgb(0 0 0 / 0.6)',
        overlay: '0 16px 48px -16px rgb(0 0 0 / 0.75)',
      },
      backgroundImage: {
        grid: `linear-gradient(to right, rgb(var(--c-line) / 0.5) 1px, transparent 1px),
               linear-gradient(to bottom, rgb(var(--c-line) / 0.5) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(-4px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        'fade-in': 'fade-in 120ms ease-out',
        'scale-in': 'scale-in 120ms ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
