import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tronvercel/ui';
import { PrimitivesSection } from './sections/Primitives';
import { FormSection } from './sections/Form';
import { OverlaySection } from './sections/Overlay';
import { DataSection } from './sections/Data';
import { CompositesSection } from './sections/Composites';
import { AuthSection } from './sections/Auth';
import { CodeSnippetSection } from './sections/CodeSnippetSection';

const TABS = [
  { id: 'primitives', label: 'Primitives' },
  { id: 'form', label: 'Form' },
  { id: 'overlay', label: 'Overlay' },
  { id: 'data', label: 'Data' },
  { id: 'composites', label: 'Composites' },
  { id: 'auth', label: 'Auth' },
  { id: 'code', label: 'Code' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function App() {
  const [active, setActive] = useState<TabId>('primitives');

  return (
    <div className="min-h-screen bg-base">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-line bg-ink/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">@tronvercel/ui</span>
            <span className="text-faint">/</span>
            <span className="text-sm text-muted">Component Showcase</span>
          </div>
          <a
            href="https://github.com/kyle079/tronvercel-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-2xs text-faint transition-colors hover:text-muted"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-fg">
            @tronvercel/ui
          </h1>
          <p className="text-sm text-muted">
            Shared React component library with the restrained Tron/Vercel theme — dark, geometric, precise.
            Built on Radix UI + Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Tabs value={active} onValueChange={(v) => setActive(v as TabId)}>
          <TabsList className="mb-8">
            {TABS.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="primitives"><PrimitivesSection /></TabsContent>
          <TabsContent value="form"><FormSection /></TabsContent>
          <TabsContent value="overlay"><OverlaySection /></TabsContent>
          <TabsContent value="data"><DataSection /></TabsContent>
          <TabsContent value="composites"><CompositesSection /></TabsContent>
          <TabsContent value="auth"><AuthSection /></TabsContent>
          <TabsContent value="code"><CodeSnippetSection /></TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-line mt-16 py-6">
        <div className="mx-auto max-w-5xl px-6 text-center font-mono text-2xs text-faint">
          @tronvercel/ui — MIT License
        </div>
      </footer>
    </div>
  );
}
