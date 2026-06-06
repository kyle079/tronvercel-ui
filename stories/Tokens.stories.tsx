import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design/Tokens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const surfaces = [
  { name: 'ink', cls: 'bg-ink', hex: '#06080a', desc: 'Deepest background' },
  { name: 'base', cls: 'bg-base', hex: '#0a0d0f', desc: 'App background' },
  { name: 'surface', cls: 'bg-surface', hex: '#101417', desc: 'Panels, cards' },
  { name: 'raised', cls: 'bg-raised', hex: '#161b1f', desc: 'Hover / lifted' },
  { name: 'overlay', cls: 'bg-overlay', hex: '#14191d', desc: 'Dialogs, popovers' },
];

const lines = [
  { name: 'line', cls: 'bg-line', hex: '#21292e', desc: 'Hairline borders' },
  { name: 'line-strong', cls: 'bg-line-strong', hex: '#2e3940', desc: 'Emphasized edges' },
];

const text = [
  { name: 'fg', cls: 'text-fg', hex: '#e2e7e9', desc: 'Primary text' },
  { name: 'muted', cls: 'text-muted', hex: '#8a969b', desc: 'Secondary text' },
  { name: 'faint', cls: 'text-faint', hex: '#5c676c', desc: 'Tertiary / disabled' },
];

const accent = [
  { name: 'accent', cls: 'bg-accent', hex: '#34c0d4', desc: 'Technical cyan — flat, never glowing' },
  { name: 'accent-dim', cls: 'bg-accent-dim', hex: '#266e7a', desc: 'Borders, idle accent' },
];

const status = [
  { name: 'ok', cls: 'bg-ok', hex: '#3fb950', desc: 'Success' },
  { name: 'warn', cls: 'bg-warn', hex: '#d29922', desc: 'Warning' },
  { name: 'danger', cls: 'bg-danger', hex: '#f85149', desc: 'Error / destructive' },
  { name: 'info', cls: 'bg-info', hex: '#58a6ff', desc: 'Informational' },
];

type SwatchEntry = { name: string; cls: string; hex: string; desc: string };

function Swatch({ name, cls, hex, desc }: SwatchEntry) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-8 w-12 shrink-0 rounded border border-line ${cls}`} />
      <div>
        <div className="font-mono text-xs text-fg">{name}</div>
        <div className="font-mono text-2xs text-faint">{hex}</div>
        <div className="text-2xs text-muted">{desc}</div>
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: SwatchEntry[] }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-faint">{title}</h3>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <Swatch key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

export const ColorTokens: Story = {
  render: () => (
    <div className="min-h-screen bg-base p-8">
      <h1 className="mb-1 font-mono text-lg text-fg">Design Tokens</h1>
      <p className="mb-8 text-sm text-muted">
        Restrained Tron / Vercel — dark, geometric, one accent, flat. No glow.
      </p>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        <Section title="Surfaces" items={surfaces} />
        <Section title="Lines" items={lines} />
        <Section title="Text" items={text} />
        <Section title="Accent" items={accent} />
        <Section title="Status" items={status} />
      </div>
    </div>
  ),
};
