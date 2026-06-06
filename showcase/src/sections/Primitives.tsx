import {
  Button,
  Badge,
  StatusDot,
  StatusPill,
  Kbd,
  Spinner,
  Skeleton,
  SkeletonText,
  Terminal,
  type TerminalLine,
} from '@tronvercel/ui';
import { ComponentDemo, Section } from './shared';

const TERMINAL_LINES: TerminalLine[] = [
  { kind: 'system', content: 'connected to deploy-shell-12' },
  { kind: 'input', content: '$ npm run build' },
  { content: 'vite v5.4.20 building for production...' },
  { kind: 'success', content: '✓ built in 812ms' },
  { content: 'artifact: dist/tronvercel-ui.js' },
];

export function PrimitivesSection() {
  return (
    <div>
      <Section title="Button">
        <ComponentDemo
          name="Button"
          description="Primary action control with four variants and three sizes."
          demo={
            <>
              <Button variant="primary">Primary</Button>
              <Button variant="default">Default</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </>
          }
          code={`import { Button } from '@tronvercel/ui';

<Button variant="primary">Primary</Button>
<Button variant="default">Default</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
        />
        <ComponentDemo
          name="Button sizes"
          description="sm, md (default), and icon sizes."
          demo={
            <>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="icon" aria-label="icon">⚡</Button>
              <Button disabled>Disabled</Button>
            </>
          }
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="icon" aria-label="icon">⚡</Button>
<Button disabled>Disabled</Button>`}
        />
      </Section>

      <Section title="Badge">
        <ComponentDemo
          name="Badge"
          description="Tone-aware label chip: neutral, accent, ok, warn, danger, info."
          demo={
            <>
              <Badge tone="neutral">neutral</Badge>
              <Badge tone="accent">accent</Badge>
              <Badge tone="ok">ok</Badge>
              <Badge tone="warn">warn</Badge>
              <Badge tone="danger">danger</Badge>
              <Badge tone="info">info</Badge>
            </>
          }
          code={`import { Badge } from '@tronvercel/ui';

<Badge tone="neutral">neutral</Badge>
<Badge tone="accent">accent</Badge>
<Badge tone="ok">ok</Badge>
<Badge tone="warn">warn</Badge>
<Badge tone="danger">danger</Badge>
<Badge tone="info">info</Badge>`}
        />
        <ComponentDemo
          name="StatusDot / StatusPill"
          description="Inline status indicator — dot only or dot + label."
          demo={
            <>
              <StatusDot tone="ok" />
              <StatusDot tone="warn" />
              <StatusDot tone="danger" />
              <StatusPill tone="ok" label="running" />
              <StatusPill tone="warn" label="degraded" />
              <StatusPill tone="danger" label="offline" />
            </>
          }
          code={`import { StatusDot, StatusPill } from '@tronvercel/ui';

<StatusDot tone="ok" />
<StatusDot tone="warn" />
<StatusPill tone="ok" label="running" />
<StatusPill tone="warn" label="degraded" />
<StatusPill tone="danger" label="offline" />`}
        />
      </Section>

      <Section title="Utilities">
        <ComponentDemo
          name="Kbd"
          description="Keyboard key glyph for shortcut hints."
          demo={
            <div className="flex items-center gap-2 text-sm text-muted">
              <Kbd>⌘</Kbd><span>+</span><Kbd>K</Kbd>
              <span className="ml-3 text-faint">open command palette</span>
            </div>
          }
          code={`import { Kbd } from '@tronvercel/ui';

<Kbd>⌘</Kbd> + <Kbd>K</Kbd>`}
        />
        <ComponentDemo
          name="Spinner"
          description="Loading indicator — size via className."
          demo={
            <>
              <Spinner className="h-3 w-3" />
              <Spinner />
              <Spinner className="h-5 w-5" />
            </>
          }
          code={`import { Spinner } from '@tronvercel/ui';

<Spinner className="h-3 w-3" />
<Spinner />
<Spinner className="h-5 w-5" />`}
        />
        <ComponentDemo
          name="Skeleton / SkeletonText"
          description="Shimmer placeholders while content loads."
          demo={
            <div className="w-full space-y-2">
              <Skeleton className="h-8 w-48" />
              <SkeletonText lines={3} />
            </div>
          }
          code={`import { Skeleton, SkeletonText } from '@tronvercel/ui';

<Skeleton className="h-8 w-48" />
<SkeletonText lines={3} />`}
        />
      </Section>

      <Section title="Terminal">
        <ComponentDemo
          name="Terminal"
          description="Mobile-first shell surface with status, output, and safe command input."
          demo={
            <Terminal
              title="deploy shell"
              status="connected"
              lines={TERMINAL_LINES}
              commandValue=""
              commandPlaceholder="Run command"
              className="w-full"
            />
          }
          code={`import { Terminal, type TerminalLine } from '@tronvercel/ui';

const lines: TerminalLine[] = [
  { kind: 'system', content: 'connected to deploy-shell-12' },
  { kind: 'input', content: '$ npm run build' },
  { content: 'vite v5.4.20 building for production...' },
  { kind: 'success', content: '✓ built in 812ms' },
];

<Terminal
  title="deploy shell"
  status="connected"
  lines={lines}
  commandValue=""
  commandPlaceholder="Run command"
/>`}
        />
      </Section>
    </div>
  );
}
