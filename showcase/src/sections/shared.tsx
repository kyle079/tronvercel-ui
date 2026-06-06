import type { ReactNode } from 'react';
import { CodeSnippet, Panel, PanelBody } from '@tronvercel/ui';

interface ComponentDemoProps {
  name: string;
  description: string;
  demo: ReactNode;
  code: string;
  language?: string;
}

export function ComponentDemo({ name, description, demo, code, language = 'tsx' }: ComponentDemoProps) {
  return (
    <div className="mb-8">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-fg">{name}</h3>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Panel>
          <div className="flex min-h-[80px] flex-wrap items-center justify-center gap-3 py-6">
            {demo}
          </div>
        </Panel>
        <CodeSnippet code={code} language={language} filename={`${name}.tsx`} />
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 border-b border-line pb-2 font-mono text-xs uppercase tracking-widest text-faint">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function DemoRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {children}
    </div>
  );
}

export function DemoBox({ children }: { children: ReactNode }) {
  return (
    <Panel>
      <PanelBody>
        {children}
      </PanelBody>
    </Panel>
  );
}
