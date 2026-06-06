import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../src/components/ui/button';
import { Terminal, type TerminalLine } from '../src/components/ui/terminal';

const meta = {
  title: 'UI/Terminal',
  component: Terminal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

const LINES: TerminalLine[] = [
  { id: '1', kind: 'system', content: 'connected to gas-town-worker-07' },
  { id: '2', kind: 'input', content: '$ gt hook' },
  { id: '3', content: 'Hooked: tv-0kh Terminal component: mobile-first shell primitive' },
  { id: '4', kind: 'success', content: 'status: connected latency=18ms viewport=mobile-safe' },
  {
    id: '5',
    content:
      'long-output: /home/kyle/gt/tronvercel_ui/polecats/dust/tronvercel_ui/src/components/ui/terminal.tsx',
  },
];

function InteractiveTerminal() {
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>(LINES);

  return (
    <Terminal
      title="worker shell"
      status="connected"
      lines={lines}
      commandValue={value}
      onCommandChange={setValue}
      onCommandSubmit={(command) => {
        setLines((current) => [
          ...current,
          { kind: 'input', content: `$ ${command}` },
          { kind: 'system', content: `queued command: ${command}` },
        ]);
        setValue('');
      }}
      actions={<Button size="sm" variant="ghost">Reconnect</Button>}
    />
  );
}

export const Connected: Story = {
  render: () => (
    <div className="min-h-screen bg-base p-3 sm:p-8">
      <InteractiveTerminal />
    </div>
  ),
};

export const MobileViewport: Story = {
  render: () => (
    <div className="min-h-screen bg-base p-3">
      <div className="mx-auto max-w-[390px]">
        <Terminal
          title="mobile shell"
          status="connecting"
          statusText="reflowing"
          lines={LINES}
          commandValue=""
          commandPlaceholder="Command"
          height="viewport"
        />
      </div>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="min-h-screen bg-base p-8">
      <Terminal
        title="provisioning shell"
        status="empty"
        empty="Waiting for the first PTY frame."
        commandValue=""
        inputDisabled
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="min-h-screen bg-base p-8">
      <Terminal
        title="worker shell"
        status="error"
        statusText="socket closed"
        lines={[
          { kind: 'system', content: 'connecting to wss://terminal.internal/session/42' },
          { kind: 'error', content: 'connection failed: websocket closed with code 1006' },
        ]}
        commandValue=""
        commandPlaceholder="Reconnect before sending commands"
      />
    </div>
  ),
};
