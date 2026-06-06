import type { Meta, StoryObj } from '@storybook/react';
import { Badge, StatusDot, StatusPill } from '../src/components/ui/badge';
import type { Tone } from '../src/components/ui/badge';

const TONES: Tone[] = ['neutral', 'accent', 'ok', 'warn', 'danger', 'info'];

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 bg-base p-6">
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};

export const WithCount: Story = {
  render: () => (
    <div className="flex items-center gap-2 bg-base p-6">
      <Badge tone="danger">12</Badge>
      <Badge tone="warn">3</Badge>
      <Badge tone="ok">0</Badge>
      <Badge tone="accent">new</Badge>
    </div>
  ),
};

export const StatusDots: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 bg-base p-6">
      {TONES.map((tone) => (
        <StatusDot key={tone} tone={tone} />
      ))}
      <StatusDot tone="ok" pulse />
    </div>
  ),
};

export const StatusPills: Story = {
  render: () => (
    <div className="flex flex-col gap-2 bg-base p-6">
      <StatusPill tone="ok" label="running" pulse />
      <StatusPill tone="warn" label="degraded" />
      <StatusPill tone="danger" label="stopped" />
      <StatusPill tone="neutral" label="idle" />
      <StatusPill tone="accent" label="active" />
    </div>
  ),
};
