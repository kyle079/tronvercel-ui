import { useState } from 'react';
import {
  Input,
  Textarea,
  Label,
  Checkbox,
  Switch,
  RadioGroup,
  RadioItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@tronvercel/ui';
import { ComponentDemo, Section } from './shared';

export function FormSection() {
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [radio, setRadio] = useState('a');

  return (
    <div>
      <Section title="Text inputs">
        <ComponentDemo
          name="Input"
          description="Single-line text input with placeholder and disabled states."
          demo={
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Input placeholder="Enter a value…" />
              <Input placeholder="Disabled" disabled />
            </div>
          }
          code={`import { Input } from '@tronvercel/ui';

<Input placeholder="Enter a value…" />
<Input placeholder="Disabled" disabled />`}
        />
        <ComponentDemo
          name="Textarea"
          description="Resizable multi-line text input."
          demo={
            <div className="w-full max-w-sm">
              <Textarea placeholder="Write something…" rows={3} />
            </div>
          }
          code={`import { Textarea } from '@tronvercel/ui';

<Textarea placeholder="Write something…" rows={3} />`}
        />
        <ComponentDemo
          name="Label"
          description="Accessible form label that pairs with any input."
          demo={
            <div className="flex w-full max-w-sm flex-col gap-1.5">
              <Label htmlFor="demo-input">Project name</Label>
              <Input id="demo-input" placeholder="my-project" />
            </div>
          }
          code={`import { Label, Input } from '@tronvercel/ui';

<Label htmlFor="project">Project name</Label>
<Input id="project" placeholder="my-project" />`}
        />
      </Section>

      <Section title="Select">
        <ComponentDemo
          name="Select"
          description="Radix-based dropdown select with custom styling."
          demo={
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Pick region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east">us-east-1</SelectItem>
                <SelectItem value="us-west">us-west-2</SelectItem>
                <SelectItem value="eu-west">eu-west-1</SelectItem>
              </SelectContent>
            </Select>
          }
          code={`import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@tronvercel/ui';

<Select>
  <SelectTrigger><SelectValue placeholder="Pick region" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="us-east">us-east-1</SelectItem>
    <SelectItem value="us-west">us-west-2</SelectItem>
  </SelectContent>
</Select>`}
        />
      </Section>

      <Section title="Toggle controls">
        <ComponentDemo
          name="Checkbox"
          description="Tri-state checkbox (checked / indeterminate / unchecked)."
          demo={
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="cb1"
                  checked={checked}
                  onCheckedChange={(v) => setChecked(v === true)}
                />
                <Label htmlFor="cb1">Enable feature flag</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cb2" checked="indeterminate" />
                <Label htmlFor="cb2">Indeterminate</Label>
              </div>
            </div>
          }
          code={`import { Checkbox, Label } from '@tronvercel/ui';

<Checkbox id="cb" checked={checked} onCheckedChange={setChecked} />
<Label htmlFor="cb">Enable feature flag</Label>`}
        />
        <ComponentDemo
          name="Switch"
          description="Toggle switch for binary on/off settings."
          demo={
            <div className="flex items-center gap-3">
              <Switch
                id="sw"
                checked={switched}
                onCheckedChange={setSwitched}
              />
              <Label htmlFor="sw">{switched ? 'Enabled' : 'Disabled'}</Label>
            </div>
          }
          code={`import { Switch, Label } from '@tronvercel/ui';

<Switch id="sw" checked={enabled} onCheckedChange={setEnabled} />
<Label htmlFor="sw">{enabled ? 'Enabled' : 'Disabled'}</Label>`}
        />
        <ComponentDemo
          name="RadioGroup"
          description="Radio group for single-choice selection."
          demo={
            <RadioGroup value={radio} onValueChange={setRadio} className="flex flex-col gap-2">
              {(['a', 'b', 'c'] as const).map((v) => (
                <div key={v} className="flex items-center gap-2">
                  <RadioItem value={v} id={`r-${v}`} />
                  <Label htmlFor={`r-${v}`}>Option {v.toUpperCase()}</Label>
                </div>
              ))}
            </RadioGroup>
          }
          code={`import { RadioGroup, RadioItem, Label } from '@tronvercel/ui';

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioItem value="a" id="r-a" />
    <Label htmlFor="r-a">Option A</Label>
  </div>
</RadioGroup>`}
        />
      </Section>
    </div>
  );
}
