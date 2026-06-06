import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../src/components/ui/label';
import { Textarea } from '../src/components/ui/textarea';
import { Checkbox } from '../src/components/ui/checkbox';
import { Switch } from '../src/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../src/components/ui/select';
import { RadioGroup, RadioItem } from '../src/components/ui/radio';

const meta = {
  title: 'UI/FormControls',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Label
// ---------------------------------------------------------------------------

export const Labels: Story = {
  render: () => (
    <div className="flex flex-col gap-3 bg-base p-6">
      <Label>Default label</Label>
      <Label htmlFor="demo-input">Label with htmlFor</Label>
      <div className="flex flex-col gap-1">
        <Label htmlFor="labeled-input">Project name</Label>
        <input
          id="labeled-input"
          className="h-8 rounded border border-line bg-ink/60 px-2.5 text-sm text-fg"
          placeholder="my-project"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Textarea
// ---------------------------------------------------------------------------

export const Textareas: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3 bg-base p-6">
      <Textarea placeholder="Write something…" />
      <Textarea defaultValue="Pre-filled content that spans multiple lines and can be resized." />
      <Textarea placeholder="Disabled" disabled />
    </div>
  ),
};

export const TextareaWithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5 bg-base p-6">
      <Label htmlFor="notes">Notes</Label>
      <Textarea id="notes" placeholder="Add any additional context…" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

function CheckboxesDemo() {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3 bg-base p-6">
      <div className="flex items-center gap-2">
        <Checkbox id="cb-uncontrolled" />
        <Label htmlFor="cb-uncontrolled">Uncontrolled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-controlled" checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
        <Label htmlFor="cb-controlled">Controlled: {checked ? 'checked' : 'unchecked'}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-checked" defaultChecked />
        <Label htmlFor="cb-checked">Checked by default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-indeterminate" indeterminate />
        <Label htmlFor="cb-indeterminate">Indeterminate</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-disabled" disabled />
        <Label htmlFor="cb-disabled">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-disabled-checked" disabled defaultChecked />
        <Label htmlFor="cb-disabled-checked">Disabled + checked</Label>
      </div>
    </div>
  );
}

export const Checkboxes: Story = {
  render: () => <CheckboxesDemo />,
};

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------

function SwitchesDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col gap-3 bg-base p-6">
      <div className="flex items-center gap-2">
        <Switch id="sw-uncontrolled" />
        <Label htmlFor="sw-uncontrolled">Uncontrolled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="sw-controlled" checked={on} onCheckedChange={setOn} />
        <Label htmlFor="sw-controlled">Controlled: {on ? 'on' : 'off'}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="sw-on" defaultChecked />
        <Label htmlFor="sw-on">On by default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="sw-disabled" disabled />
        <Label htmlFor="sw-disabled">Disabled off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="sw-disabled-on" disabled defaultChecked />
        <Label htmlFor="sw-disabled-on">Disabled on</Label>
      </div>
    </div>
  );
}

export const Switches: Story = {
  render: () => <SwitchesDemo />,
};

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------

export const Selects: Story = {
  render: () => (
    <div className="flex w-56 flex-col gap-4 bg-base p-6">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose region…" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="us-east-1">us-east-1</SelectItem>
            <SelectItem value="us-west-2">us-west-2</SelectItem>
            <SelectItem value="ca-central-1">ca-central-1</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="eu-west-1">eu-west-1</SelectItem>
            <SelectItem value="eu-central-1">eu-central-1</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select defaultValue="eu-west-1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us-east-1">us-east-1</SelectItem>
          <SelectItem value="eu-west-1">eu-west-1</SelectItem>
        </SelectContent>
      </Select>

      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="x">Option</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const SelectWithLabel: Story = {
  render: () => (
    <div className="flex w-56 flex-col gap-1.5 bg-base p-6">
      <Label htmlFor="region-select">Deployment region</Label>
      <Select>
        <SelectTrigger id="region-select">
          <SelectValue placeholder="Select region…" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us-east-1">us-east-1</SelectItem>
          <SelectItem value="us-west-2">us-west-2</SelectItem>
          <SelectItem value="eu-west-1">eu-west-1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Radio
// ---------------------------------------------------------------------------

function RadiosDemo() {
  const [value, setValue] = useState('auto');
  return (
    <div className="flex flex-col gap-4 bg-base p-6">
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-2">
        {(['auto', 'manual', 'disabled-opt'] as const).map((v) => (
          <div key={v} className="flex items-center gap-2">
            <RadioItem id={`r-${v}`} value={v} disabled={v === 'disabled-opt'} />
            <Label htmlFor={`r-${v}`}>{v}</Label>
          </div>
        ))}
      </RadioGroup>
      <p className="text-xs text-muted">Selected: {value}</p>

      <div className="border-t border-line pt-4">
        <p className="mb-2 text-xs text-muted">Horizontal layout</p>
        <RadioGroup defaultValue="sm" className="flex gap-4">
          {['sm', 'md', 'lg'].map((size) => (
            <div key={size} className="flex items-center gap-1.5">
              <RadioItem id={`rs-${size}`} value={size} />
              <Label htmlFor={`rs-${size}`}>{size}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export const Radios: Story = {
  render: () => <RadiosDemo />,
};

// ---------------------------------------------------------------------------
// Composite form example
// ---------------------------------------------------------------------------

export const FormExample: Story = {
  name: 'Composite: Settings form',
  render: () => (
    <div className="flex w-80 flex-col gap-5 rounded border border-line bg-surface p-6">
      <div className="flex flex-col gap-1">
        <Label htmlFor="proj-name">Project name</Label>
        <input
          id="proj-name"
          className="h-8 rounded border border-line bg-ink/60 px-2.5 text-sm text-fg placeholder:text-faint focus:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          placeholder="my-project"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="form-region">Region</Label>
        <Select defaultValue="us-east-1">
          <SelectTrigger id="form-region">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us-east-1">us-east-1</SelectItem>
            <SelectItem value="eu-west-1">eu-west-1</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="form-notes">Notes</Label>
        <Textarea id="form-notes" placeholder="Optional notes…" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Framework</Label>
        <RadioGroup defaultValue="next" className="flex flex-col gap-1.5">
          {['next', 'vite', 'remix'].map((fw) => (
            <div key={fw} className="flex items-center gap-2">
              <RadioItem id={`fw-${fw}`} value={fw} />
              <Label htmlFor={`fw-${fw}`}>{fw}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-deploy">Auto-deploy</Label>
          <Switch id="auto-deploy" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="pr-previews">PR previews</Label>
          <Switch id="pr-previews" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Checkbox id="tos" />
          <Label htmlFor="tos">I accept the terms of service</Label>
        </div>
      </div>
    </div>
  ),
};
