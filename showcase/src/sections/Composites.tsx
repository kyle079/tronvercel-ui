import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Button,
  Panel,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  OperatorSummaryStack,
} from '@tronvercel/ui';
import { ComponentDemo, Section } from './shared';

function ToastDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button
        variant="default"
        onClick={() => {
          setOpen(false);
          requestAnimationFrame(() => setOpen(true));
        }}
      >
        Show Toast
      </Button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Deployment started</ToastTitle>
        <ToastDescription>Build #1248 is queued.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export function CompositesSection() {
  const [tab, setTab] = useState('overview');

  return (
    <div>
      <Section title="Tabs">
        <ComponentDemo
          name="Tabs"
          description="Tabbed navigation with keyboard support."
          demo={
            <Tabs value={tab} onValueChange={setTab} className="w-full max-w-sm">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Panel className="mt-3">
                  <p className="text-xs text-muted">Overview content</p>
                </Panel>
              </TabsContent>
              <TabsContent value="metrics">
                <Panel className="mt-3">
                  <p className="text-xs text-muted">Metrics content</p>
                </Panel>
              </TabsContent>
              <TabsContent value="logs">
                <Panel className="mt-3">
                  <p className="text-xs text-muted">Log output here</p>
                </Panel>
              </TabsContent>
            </Tabs>
          }
          code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tronvercel/ui';

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="metrics">Metrics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="metrics">Metrics content</TabsContent>
</Tabs>`}
        />
      </Section>

      <Section title="Command">
        <ComponentDemo
          name="Command"
          description="cmdk-powered command palette — search, keyboard nav, grouped items."
          demo={
            <Panel flush className="w-full max-w-sm overflow-hidden">
              <Command>
                <CommandInput placeholder="Search commands…" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Deployments">
                    <CommandItem>Deploy to production</CommandItem>
                    <CommandItem>Rollback last deploy</CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Settings">
                    <CommandItem>Environment variables</CommandItem>
                    <CommandItem>Team members</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </Panel>
          }
          code={`import {
  Command, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
} from '@tronvercel/ui';

<Command>
  <CommandInput placeholder="Search commands…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Deployments">
      <CommandItem>Deploy to production</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        />
      </Section>

      <Section title="Toast">
        <ComponentDemo
          name="Toast"
          description="Radix-based toast notification. Trigger programmatically with state."
          demo={<ToastDemo />}
          code={`import {
  ToastProvider, ToastViewport,
  Toast, ToastTitle, ToastDescription, ToastClose,
} from '@tronvercel/ui';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show Toast</Button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Deployment started</ToastTitle>
        <ToastDescription>Build #1248 is queued.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}`}
        />
      </Section>

      <Section title="Operator Summary">
        <ComponentDemo
          name="OperatorSummaryCard / OperatorSummaryStack"
          description="Mobile-first status summary composites for operator feeds, shift handoff, and incident snapshots."
          demo={
            <div className="w-full max-w-sm">
              <OperatorSummaryStack
                items={[
                  {
                    eyebrow: 'Shift A',
                    title: 'Ingress cluster',
                    statusLabel: 'Stable',
                    statusTone: 'ok',
                    statusPulse: true,
                    summary: 'Traffic is within burn-rate targets across all edge regions.',
                    updatedAt: '14:42Z',
                    metrics: [
                      { label: 'Latency', value: '42 ms', tone: 'ok' },
                      { label: 'Error rate', value: '0.08%', tone: 'ok' },
                    ],
                    details: [
                      { label: 'Primary region', value: 'iad1' },
                      { label: 'Escalation owner', value: 'N. Flores' },
                    ],
                    footer: 'Auto-remediation armed',
                    actions: <Button size="sm" variant="ghost">Inspect</Button>,
                  },
                ]}
              />
            </div>
          }
          code={`import { OperatorSummaryStack, Button } from '@tronvercel/ui';

<OperatorSummaryStack
  items={[
    {
      eyebrow: 'Shift A',
      title: 'Ingress cluster',
      statusLabel: 'Stable',
      statusTone: 'ok',
      summary: 'Traffic is within burn-rate targets across all edge regions.',
      updatedAt: '14:42Z',
      metrics: [
        { label: 'Latency', value: '42 ms', tone: 'ok' },
        { label: 'Error rate', value: '0.08%', tone: 'ok' },
      ],
      details: [
        { label: 'Primary region', value: 'iad1' },
        { label: 'Escalation owner', value: 'N. Flores' },
      ],
      footer: 'Auto-remediation armed',
      actions: <Button size="sm" variant="ghost">Inspect</Button>,
    },
  ]}
/>`}
        />
      </Section>
    </div>
  );
}
