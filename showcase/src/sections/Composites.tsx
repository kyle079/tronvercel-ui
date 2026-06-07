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
  ActionRow,
  ActionGroup,
  ActionMeta,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Panel,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
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

      <Section title="ActionRow">
        <ComponentDemo
          name="ActionRow"
          description="Compact operator control strip for dense filters, bulk actions, and queue state."
          demo={
            <ActionRow
              left={
                <>
                  <ActionMeta label="18 selected" hint="scope: active incidents" />
                  <ActionGroup grow>
                    <Input className="w-full sm:w-44" placeholder="Search…" />
                    <Select defaultValue="open">
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="acked">Acked</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </ActionGroup>
                </>
              }
              right={
                <>
                  <Button size="sm" variant="ghost">Clear</Button>
                  <Button size="sm">Assign</Button>
                </>
              }
            />
          }
          code={`import {
  ActionRow, ActionGroup, ActionMeta,
  Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button,
} from '@tronvercel/ui';

<ActionRow
  left={
    <>
      <ActionMeta label="18 selected" hint="scope: active incidents" />
      <ActionGroup grow>
        <Input placeholder="Search…" />
        <Select defaultValue="open">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
          </SelectContent>
        </Select>
      </ActionGroup>
    </>
  }
  right={<Button size="sm">Assign</Button>}
/>`}
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
    </div>
  );
}
