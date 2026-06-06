import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'default', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'icon'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary action' },
};

export const Default: Story = {
  args: { variant: 'default', children: 'Default' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Destructive' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3 bg-base p-6">
      <Button variant="primary">Primary</Button>
      <Button variant="default">Default</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
