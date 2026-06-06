import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from '../src/components/ui/card';
import { Skeleton, SkeletonText } from '../src/components/ui/skeleton';
import {
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
} from '../src/components/ui/table';
import { ListRow, ListGroup } from '../src/components/ui/list-row';
import { Pagination } from '../src/components/ui/pagination';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '../src/components/ui/toast';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import type { Tone } from '../src/components/ui/badge';

const meta = {
  title: 'UI/DataDisplay',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

export const Cards: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4 bg-base p-6">
      <Card>
        <p className="text-sm text-muted">Default card with padding and shadow.</p>
      </Card>
      <Card variant="flush">
        <div className="p-4">
          <p className="text-sm text-muted">Flush card (no padding — use PanelBody).</p>
        </div>
      </Card>
      <Card variant="ghost">
        <p className="text-sm text-muted">Ghost card — transparent, no border.</p>
      </Card>
    </div>
  ),
};

export const CardWithHeader: Story = {
  render: () => (
    <div className="w-72 bg-base p-6">
      <Card variant="flush">
        <div className="p-4">
          <CardHeader
            title="Project metrics"
            description="Last 30 days"
            actions={<Button size="sm">View all</Button>}
          />
          <CardBody>
            <p className="text-xs text-muted">Deployment count, build time, error rate…</p>
          </CardBody>
        </div>
        <CardFooter className="px-4 pb-4">
          <Badge tone="ok">2 deployments</Badge>
          <Badge tone="neutral">avg 42s</Badge>
        </CardFooter>
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

export const Skeletons: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4 bg-base p-6">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-3">
        <Skeleton circle className="h-8 w-8" />
        <div className="flex-1">
          <SkeletonText lines={2} />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
    </div>
  ),
};

export const SkeletonCard: Story = {
  render: () => (
    <div className="w-72 bg-base p-6">
      <Card>
        <div className="flex items-center gap-3 pb-3">
          <Skeleton circle className="h-8 w-8" />
          <div className="flex-1">
            <Skeleton className="mb-1.5 h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <SkeletonText lines={3} />
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

const deployments = [
  { id: 'dpl-1a2b', project: 'web-app', branch: 'main', status: 'ok' as Tone, age: '2m ago' },
  { id: 'dpl-3c4d', project: 'api', branch: 'feat/auth', status: 'warn' as Tone, age: '15m ago' },
  { id: 'dpl-5e6f', project: 'docs', branch: 'main', status: 'danger' as Tone, age: '1h ago' },
  { id: 'dpl-7g8h', project: 'web-app', branch: 'fix/ssr', status: 'neutral' as Tone, age: '3h ago' },
];

const statusLabel: Record<Tone, string> = {
  ok: 'Ready',
  warn: 'Building',
  danger: 'Error',
  neutral: 'Cancelled',
  accent: 'Active',
  info: 'Queued',
};

export const Tables: Story = {
  render: () => (
    <div className="w-[560px] bg-base p-6">
      <TableRoot>
        <TableHead>
          <TableRow>
            <TableTh>Deployment</TableTh>
            <TableTh>Project</TableTh>
            <TableTh>Branch</TableTh>
            <TableTh>Status</TableTh>
            <TableTh>Age</TableTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {deployments.map((d) => (
            <TableRow key={d.id}>
              <TableTd className="font-mono text-xs text-muted">{d.id}</TableTd>
              <TableTd>{d.project}</TableTd>
              <TableTd className="font-mono text-xs">{d.branch}</TableTd>
              <TableTd>
                <Badge tone={d.status}>{statusLabel[d.status]}</Badge>
              </TableTd>
              <TableTd className="text-muted">{d.age}</TableTd>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ListRow
// ---------------------------------------------------------------------------

export const ListRows: Story = {
  render: () => (
    <div className="w-72 bg-base p-6">
      <ListGroup>
        <ListRow>Plain row</ListRow>
        <ListRow leading={<span className="text-accent">→</span>} trailing={<Badge tone="ok">active</Badge>}>
          With leading and trailing
        </ListRow>
        <ListRow interactive leading={<span className="text-muted">⊞</span>}>
          Interactive row (hover me)
        </ListRow>
        <ListRow muted>Muted / inactive row</ListRow>
        <ListRow
          interactive
          leading={<span className="font-mono text-xs text-faint">v1.2</span>}
          trailing={<span className="font-mono text-xs text-muted">3m ago</span>}
        >
          Version entry
        </ListRow>
      </ListGroup>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

function PaginationDemo() {
  const [page, setPage] = useState(3);
  return (
    <div className="flex flex-col items-center gap-4 bg-base p-6">
      <Pagination page={page} totalPages={12} onPageChange={setPage} />
      <p className="text-xs text-muted">Page {page} of 12</p>
      <div className="border-t border-line pt-4">
        <p className="mb-2 text-xs text-faint">Few pages</p>
        <Pagination page={2} totalPages={4} onPageChange={() => {}} />
      </div>
    </div>
  );
}

export const PaginationStory: Story = {
  name: 'Pagination',
  render: () => <PaginationDemo />,
};

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------

const TONES: Tone[] = ['neutral', 'ok', 'warn', 'danger', 'info', 'accent'];

function ToastDemo() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>('ok');

  function trigger(t: Tone) {
    setTone(t);
    setOpen(false);
    setTimeout(() => setOpen(true), 50);
  }

  return (
    <ToastProvider>
      <div className="flex flex-col gap-3 bg-base p-6">
        <p className="mb-1 text-xs text-muted">Click to show toast</p>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <Button key={t} size="sm" variant="default" onClick={() => trigger(t)}>
              {t}
            </Button>
          ))}
        </div>
      </div>

      <Toast open={open} onOpenChange={setOpen} tone={tone} duration={3000}>
        <ToastTitle tone={tone}>{tone.charAt(0).toUpperCase() + tone.slice(1)} notification</ToastTitle>
        <ToastDescription>This is a {tone} toast message.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const Toasts: Story = {
  render: () => <ToastDemo />,
};

export const ToastAllTones: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ToastProvider>
      <div className="flex min-h-screen flex-col gap-3 bg-base p-8">
        <p className="mb-2 text-xs text-muted">All toast tones (static preview)</p>
        {TONES.map((tone) => (
          <div
            key={tone}
            className="pointer-events-auto relative flex w-80 items-start gap-3 rounded-md border bg-overlay px-3 py-2.5 shadow-overlay"
            style={{ borderColor: `var(--tone-border-${tone}, var(--c-line))` }}
          >
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: `rgb(var(--c-${tone === 'neutral' ? 'muted' : tone}))` }}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </p>
              <p className="mt-0.5 text-xs text-muted">Toast description text</p>
            </div>
          </div>
        ))}
      </div>
    </ToastProvider>
  ),
};
