import { Code, CodeSnippet } from '@tronvercel/ui';
import { Section } from './shared';

const EXAMPLE_TSX = `import { Button, Badge } from '@tronvercel/ui';

function DeployButton({ status }: { status: 'ok' | 'warn' }) {
  return (
    <div className="flex items-center gap-2">
      <Badge tone={status}>{status}</Badge>
      <Button variant="primary" size="sm">Deploy</Button>
    </div>
  );
}`;

const EXAMPLE_SH = `# Install
npm install @tronvercel/ui

# Peer deps
npm install react react-dom \\
  @radix-ui/react-checkbox \\
  lucide-react clsx tailwind-merge`;

const EXAMPLE_JSON = `{
  "name": "my-app",
  "dependencies": {
    "@tronvercel/ui": "^0.1.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}`;

export function CodeSnippetSection() {
  return (
    <div>
      <Section title="Code (inline)">
        <div className="mb-8">
          <h3 className="mb-1 text-sm font-medium text-fg">Code</h3>
          <p className="mb-4 text-xs text-muted">
            Inline code fragment with optional syntax highlighting. Renders as a{' '}
            <Code language="html">{'<code>'}</Code> element.
          </p>
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-md border border-line bg-surface p-4">
            <Code>const x = 42</Code>
            <Code language="typescript">type Tone = 'ok' | 'warn' | 'danger'</Code>
            <Code language="bash">npm install @tronvercel/ui</Code>
          </div>
          <CodeSnippet
            code={`import { Code } from '@tronvercel/ui';

<Code>const x = 42</Code>
<Code language="typescript">type Tone = 'ok' | 'warn' | 'danger'</Code>
<Code language="bash">npm install @tronvercel/ui</Code>`}
            language="tsx"
            filename="Code.tsx"
          />
        </div>
      </Section>

      <Section title="CodeSnippet (block)">
        <div className="mb-8">
          <h3 className="mb-1 text-sm font-medium text-fg">CodeSnippet — TSX with filename + line numbers</h3>
          <p className="mb-4 text-xs text-muted">
            Block code display with syntax highlighting, copy button, filename header, and optional line numbers.
          </p>
          <CodeSnippet
            code={EXAMPLE_TSX}
            language="tsx"
            filename="DeployButton.tsx"
            showLineNumbers
            className="mb-6"
          />
          <CodeSnippet
            code={`import { CodeSnippet } from '@tronvercel/ui';

<CodeSnippet
  code={code}
  language="tsx"
  filename="DeployButton.tsx"
  showLineNumbers
/>`}
            language="tsx"
            filename="usage.tsx"
          />
        </div>

        <div className="mb-8">
          <h3 className="mb-1 text-sm font-medium text-fg">CodeSnippet — Shell</h3>
          <p className="mb-4 text-xs text-muted">
            Bash/shell with no line numbers. Copy button always visible.
          </p>
          <CodeSnippet
            code={EXAMPLE_SH}
            language="bash"
            filename="install.sh"
            className="mb-6"
          />
        </div>

        <div className="mb-8">
          <h3 className="mb-1 text-sm font-medium text-fg">CodeSnippet — JSON</h3>
          <p className="mb-4 text-xs text-muted">
            JSON with no header, copy button overlaid top-right.
          </p>
          <CodeSnippet
            code={EXAMPLE_JSON}
            language="json"
          />
        </div>

        <div className="mb-8">
          <h3 className="mb-1 text-sm font-medium text-fg">CodeSnippet — wrap mode</h3>
          <p className="mb-4 text-xs text-muted">
            Long lines wrap instead of scrolling. Useful for prose-heavy content.
          </p>
          <CodeSnippet
            code={`// This is a very long comment that would normally scroll horizontally. With wrap={true} it folds onto the next line instead of creating a horizontal scrollbar.
const veryLongVariableName = someFunction({ key: 'value', anotherKey: 'anotherValue', yetAnotherKey: 'yetAnotherValue' });`}
            language="typescript"
            wrap
          />
        </div>
      </Section>
    </div>
  );
}
