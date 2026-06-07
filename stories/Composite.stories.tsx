import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  AppShell,
  Sidebar,
  NavGroup,
  NavItem,
  Topbar,
} from '../src/components/ui/app-shell';
import { PageHeader } from '../src/components/ui/page-header';
import { Stack, Inline, Grid, Section } from '../src/components/ui/layout';
import { DataTable, type ColumnDef } from '../src/components/ui/data-table';
import { KeyValue, DescriptionList } from '../src/components/ui/key-value';
import { EmptyState, LoadingState, ErrorState } from '../src/components/ui/empty-state';
import { ConfirmDialog } from '../src/components/ui/confirm-dialog';
import { CommandPalette } from '../src/components/ui/command-palette';
import { ActionRow, ActionGroup, ActionMeta } from '../src/components/ui/action-row';
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from '../src/components/ui/dropdown';
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '../src/components/ui/tabs';
import { StatBlock } from '../src/components/ui/metric-card';
import { CodeBlock, KbdCombo } from '../src/components/ui/code-block';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Panel, PanelHeader } from '../src/components/ui/panel';
import { Input } from '../src/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../src/components/ui/select';

const meta = {
  title: 'Composite',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Layout helpers ───────────────────────────────────────────────
export const LayoutHelpers: Story = {
  render: () => (
    <div className="bg-base p-8 space-y-8">
      <Section title="Stack (md gap)">
        <Stack>
          <div className="h-8 rounded bg-raised" />
          <div className="h-8 rounded bg-raised" />
          <div className="h-8 rounded bg-raised" />
        </Stack>
      </Section>

      <Section title="Inline (centered)">
        <Inline gap="sm">
          <Button size="sm">A</Button>
          <Button size="sm" variant="ghost">B</Button>
          <Button size="sm" variant="primary">C</Button>
        </Inline>
      </Section>

      <Section title="Grid (3 cols)">
        <Grid cols={3} gap="sm">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-16 rounded bg-raised flex items-center justify-center text-muted text-sm">
              {n}
            </div>
          ))}
        </Grid>
      </Section>
    </div>
  ),
};

// ─── App shell ───────────────────────────────────────────────────
export const AppShellDemo: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <AppShell
        topbar={
          <Topbar
            left={<span className="text-sm font-medium text-fg">My App</span>}
            right={<Button size="sm" variant="ghost">Settings</Button>}
          />
        }
        sidebar={
          <Sidebar
            logo={<span className="font-mono text-sm font-bold text-accent">TRONVERCEL</span>}
          >
            <NavGroup label="Main">
              <NavItem label="Dashboard" active />
              <NavItem label="Projects" badge={<Badge tone="accent">3</Badge>} />
              <NavItem label="Settings" />
            </NavGroup>
            <NavGroup label="Admin">
              <NavItem label="Users" />
              <NavItem label="Logs" />
            </NavGroup>
          </Sidebar>
        }
      >
        <div className="p-6">
          <PageHeader
            title="Dashboard"
            description="Overview of your workspace"
            breadcrumb={[{ label: 'Home', href: '#' }, { label: 'Dashboard' }]}
            actions={<Button size="sm">New project</Button>}
          />
        </div>
      </AppShell>
    </div>
  ),
};

export const ActionRowDemo: Story = {
  render: () => (
    <div className="bg-base p-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <PageHeader
          title="Queue operators"
          description="Compact controls for triage, filters, and bulk actions."
          compact
        />
        <ActionRow
          left={
            <>
              <ActionMeta label="24 selected" hint="queue: ingest / hot path" />
              <ActionGroup grow>
                <Input className="w-full sm:w-56" placeholder="Search by ID or owner" />
                <Select defaultValue="ready">
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="deferred">Deferred</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="p2">
                  <SelectTrigger className="w-full sm:w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">P1</SelectItem>
                    <SelectItem value="p2">P2</SelectItem>
                    <SelectItem value="p3">P3</SelectItem>
                  </SelectContent>
                </Select>
              </ActionGroup>
            </>
          }
          right={
            <>
              <Button size="sm" variant="ghost">Reset</Button>
              <Button size="sm">Assign</Button>
              <Button size="sm" variant="primary">Dispatch</Button>
            </>
          }
        />
      </div>
    </div>
  ),
};

// ─── Data table ───────────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
}

const USERS: User[] = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', status: 'active', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'inactive', role: 'Viewer' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', status: 'active', role: 'Editor' },
  { id: 4, name: 'Dave Brown', email: 'dave@example.com', status: 'active', role: 'Viewer' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', status: 'inactive', role: 'Editor' },
];

const USER_COLS: ColumnDef<User>[] = [
  { key: 'name', header: 'Name', sortable: true, cell: (r) => <span className="font-medium text-fg">{r.name}</span> },
  { key: 'email', header: 'Email', cell: (r) => r.email },
  { key: 'role', header: 'Role', sortable: true, cell: (r) => r.role },
  {
    key: 'status',
    header: 'Status',
    cell: (r) => (
      <Badge tone={r.status === 'active' ? 'ok' : 'neutral'}>{r.status}</Badge>
    ),
  },
];

export const DataTableDemo: Story = {
  render: () => (
    <div className="bg-base p-8">
      <Panel flush>
        <PanelHeader title="Users" hint="5 members" />
        <DataTable
          columns={USER_COLS}
          data={USERS}
          rowKey={(r) => r.id}
        />
      </Panel>
    </div>
  ),
};

function SortableTable() {
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  return (
    <div className="bg-base p-8">
      <Panel flush>
        <PanelHeader title="Sortable table" hint="click headers" />
        <DataTable
          columns={USER_COLS}
          data={USERS}
          rowKey={(r) => r.id}
          sortKey={sort?.key}
          sortDir={sort?.dir}
          onSort={(key, dir) => setSort({ key, dir })}
        />
      </Panel>
    </div>
  );
}

export const DataTableSortable: Story = {
  render: () => <SortableTable />,
};

export const DataTableLoading: Story = {
  render: () => (
    <div className="bg-base p-8">
      <Panel flush>
        <PanelHeader title="Loading…" />
        <DataTable columns={USER_COLS} data={[]} loading skeletonRows={4} />
      </Panel>
    </div>
  ),
};

export const DataTableEmpty: Story = {
  render: () => (
    <div className="bg-base p-8">
      <Panel flush>
        <PanelHeader title="Empty table" />
        <DataTable
          columns={USER_COLS}
          data={[]}
          emptySlot={<EmptyState title="No users found" description="Invite someone to get started." action={<Button size="sm">Invite user</Button>} />}
        />
      </Panel>
    </div>
  ),
};

// ─── Key-Value ────────────────────────────────────────────────────
export const KeyValueDemo: Story = {
  render: () => (
    <div className="bg-base p-8 max-w-md space-y-8">
      <Section title="Inline layout">
        <KeyValue items={[
          { label: 'Owner', value: 'Alice Chen' },
          { label: 'Created', value: '2024-01-15' },
          { label: 'Status', value: <Badge tone="ok">active</Badge> },
        ]} />
      </Section>
      <Section title="Description list (2 cols)">
        <DescriptionList cols={2} items={[
          { label: 'Name', value: 'My Project' },
          { label: 'Region', value: 'us-east-1' },
          { label: 'Plan', value: 'Pro' },
          { label: 'Created', value: '2024-01-15' },
        ]} />
      </Section>
    </div>
  ),
};

// ─── App UX States ────────────────────────────────────────────────
export const UXStates: Story = {
  render: () => (
    <div className="bg-base p-8 grid grid-cols-1 gap-6 max-w-lg">
      <Panel>
        <EmptyState
          title="No deployments yet"
          description="Push your first commit to trigger a deployment."
          action={<Button size="sm">Deploy now</Button>}
        />
      </Panel>
      <Panel>
        <LoadingState label="Fetching deployments…" />
      </Panel>
      <Panel>
        <ErrorState
          title="Failed to load deployments"
          message="Connection timeout — check your network and try again."
          retry={() => alert('retry')}
        />
      </Panel>
    </div>
  ),
};

// ─── Confirm dialog ───────────────────────────────────────────────
function ConfirmDialogStory() {
  const [open, setOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);
  return (
    <div className="bg-base flex items-center justify-center gap-4 p-16">
      <Button onClick={() => setOpen(true)}>Open confirm</Button>
      <Button variant="danger" onClick={() => setDangerOpen(true)}>Delete…</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm action"
        description="Are you sure you want to proceed?"
        onConfirm={() => alert('confirmed')}
      />
      <ConfirmDialog
        open={dangerOpen}
        onOpenChange={setDangerOpen}
        title="Delete project"
        description="This action is permanent and cannot be undone."
        variant="danger"
        confirmLabel="Delete"
        onConfirm={() => alert('deleted')}
      />
    </div>
  );
}

export const ConfirmDialogDemo: Story = { render: () => <ConfirmDialogStory /> };

// ─── Command palette ──────────────────────────────────────────────
function CommandPaletteStory() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-base flex flex-col items-center gap-4 p-16">
      <p className="text-sm text-muted">Press <KbdCombo keys={['⌘', 'K']} /> or click below</p>
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        globalShortcut={false}
        items={[
          { id: '1', label: 'Go to Dashboard', group: 'Navigation', onSelect: () => alert('dashboard') },
          { id: '2', label: 'Go to Settings', group: 'Navigation', onSelect: () => alert('settings') },
          { id: '3', label: 'New Project', description: 'Create', group: 'Actions', onSelect: () => alert('new') },
          { id: '4', label: 'Deploy branch', group: 'Actions', onSelect: () => alert('deploy') },
          { id: '5', label: 'View logs', onSelect: () => alert('logs') },
        ]}
      />
    </div>
  );
}

export const CommandPaletteDemo: Story = { render: () => <CommandPaletteStory /> };

// ─── Dropdown ─────────────────────────────────────────────────────
export const DropdownDemo: Story = {
  render: () => (
    <div className="bg-base flex items-center justify-center p-16">
      <DropdownRoot>
        <DropdownTrigger asChild>
          <Button variant="default">Options ▾</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Project</DropdownLabel>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Archive</DropdownItem>
          <DropdownSeparator />
          <DropdownItem danger>Delete</DropdownItem>
        </DropdownContent>
      </DropdownRoot>
    </div>
  ),
};

// ─── Tabs ─────────────────────────────────────────────────────────
export const TabsDemo: Story = {
  render: () => (
    <div className="bg-base p-8 max-w-lg">
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-6">
          <p className="text-sm text-muted">Overview content goes here.</p>
        </TabsContent>
        <TabsContent value="deployments" className="pt-6">
          <p className="text-sm text-muted">Deployments list goes here.</p>
        </TabsContent>
        <TabsContent value="logs" className="pt-6">
          <p className="text-sm text-muted">Log stream goes here.</p>
        </TabsContent>
        <TabsContent value="settings" className="pt-6">
          <p className="text-sm text-muted">Settings form goes here.</p>
        </TabsContent>
      </TabsRoot>
    </div>
  ),
};

// ─── Metric cards ─────────────────────────────────────────────────
export const MetricCardsDemo: Story = {
  render: () => (
    <div className="bg-base p-8">
      <StatBlock
        cols={4}
        stats={[
          { label: 'Deployments (30d)', value: '142', sub: '+18% vs last month', tone: 'ok' },
          { label: 'Error rate', value: '0.4%', sub: '↓ from 0.7%', tone: 'ok' },
          { label: 'Build time (avg)', value: '1m 42s', sub: '↑ 8s slower', tone: 'warn' },
          { label: 'Active users', value: '1,204', tone: 'neutral' },
        ]}
      />
    </div>
  ),
};

// ─── Code block ───────────────────────────────────────────────────
export const CodeBlockDemo: Story = {
  render: () => (
    <div className="bg-base p-8 max-w-xl space-y-6">
      <CodeBlock language="bash">{`npm install tronvercel-ui
# then import styles
import 'tronvercel-ui/styles';`}</CodeBlock>

      <CodeBlock language="tsx">{`import { Button, AppShell } from 'tronvercel-ui';

export function App() {
  return (
    <AppShell sidebar={<nav />}>
      <Button>Hello world</Button>
    </AppShell>
  );
}`}</CodeBlock>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
        <span>Shortcuts: <KbdCombo keys={['⌘', 'K']} /> palette</span>
        <span><KbdCombo keys={['⌘', 'Shift', 'P']} /> command</span>
        <span><KbdCombo keys={['Esc']} /> dismiss</span>
      </div>
    </div>
  ),
};
