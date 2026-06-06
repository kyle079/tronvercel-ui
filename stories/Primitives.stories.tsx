import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/ui/input';
import { Spinner } from '../src/components/ui/spinner';
import { Panel, PanelHeader, PanelBody } from '../src/components/ui/panel';
import { Kbd } from '../src/components/ui/kbd';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'UI/Primitives',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Inputs: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3 bg-base p-6">
      <Input placeholder="Search…" />
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="With value" />
    </div>
  ),
};

export const Spinners: Story = {
  render: () => (
    <div className="flex items-center gap-4 bg-base p-6">
      <Spinner />
      <Spinner className="h-5 w-5" />
      <Spinner className="h-7 w-7" />
    </div>
  ),
};

export const Panels: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4 bg-base p-6">
      <Panel>
        <p className="text-sm text-fg">A simple panel with padding.</p>
      </Panel>
      <Panel flush>
        <PanelHeader title="Panel Title" hint="v1.0.0" actions={<Button size="sm">Action</Button>} />
        <PanelBody>
          <p className="text-sm text-muted">Content inside a flush panel with explicit header.</p>
        </PanelBody>
      </Panel>
    </div>
  ),
};

export const Keys: Story = {
  render: () => (
    <div className="flex items-center gap-2 bg-base p-6">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <span className="text-xs text-muted">Command palette</span>
    </div>
  ),
};
