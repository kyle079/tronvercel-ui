import type { Meta, StoryObj } from '@storybook/react';
import { Code, CodeSnippet } from '../src/components/ui/code-snippet';

const meta = {
  title: 'UI/CodeSnippet',
  parameters: { layout: 'padded', backgrounds: { default: 'dark' } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const TS_EXAMPLE = `import { CodeSnippet } from '@tronvercel/ui';

export function Demo() {
  return (
    <CodeSnippet
      language="typescript"
      filename="demo.tsx"
      showLineNumbers
      code={snippet}
    />
  );
}`;

const BASH_EXAMPLE = `# Install the package
npm install @tronvercel/ui

# Or with pnpm
pnpm add @tronvercel/ui`;

const JSON_EXAMPLE = `{
  "name": "@tronvercel/ui",
  "version": "0.1.1",
  "exports": {
    ".": "./dist/tronvercel-ui.js"
  }
}`;

const LONG_LINE_EXAMPLE = `const result = someVeryLongFunctionName(firstArgument, secondArgument, thirdArgument, fourthArgument, fifthArgument);`;

export const TypeScriptWithHeader: Story = {
  render: () => (
    <div className="w-full max-w-2xl bg-base p-6">
      <CodeSnippet
        language="typescript"
        filename="demo.tsx"
        code={TS_EXAMPLE}
      />
    </div>
  ),
};

export const WithLineNumbers: Story = {
  render: () => (
    <div className="w-full max-w-2xl bg-base p-6">
      <CodeSnippet
        language="typescript"
        filename="demo.tsx"
        code={TS_EXAMPLE}
        showLineNumbers
      />
    </div>
  ),
};

export const BashNoHeader: Story = {
  render: () => (
    <div className="w-full max-w-2xl bg-base p-6">
      <CodeSnippet code={BASH_EXAMPLE} language="bash" />
    </div>
  ),
};

export const JSONWithFilename: Story = {
  render: () => (
    <div className="w-full max-w-xl bg-base p-6">
      <CodeSnippet
        language="json"
        filename="package.json"
        code={JSON_EXAMPLE}
      />
    </div>
  ),
};

export const LongLineScroll: Story = {
  render: () => (
    <div className="w-96 bg-base p-6">
      <CodeSnippet
        language="typescript"
        filename="long-line.ts"
        code={LONG_LINE_EXAMPLE}
      />
    </div>
  ),
};

export const LongLineWrap: Story = {
  render: () => (
    <div className="w-96 bg-base p-6">
      <CodeSnippet
        language="typescript"
        filename="long-line.ts"
        code={LONG_LINE_EXAMPLE}
        wrap
      />
    </div>
  ),
};

export const InlineCode: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-3 bg-base p-6 font-sans text-sm text-fg">
      <p>
        Install via <Code>npm install @tronvercel/ui</Code> then import components.
      </p>
      <p>
        The <Code language="typescript">CodeSnippet</Code> component accepts a{' '}
        <Code language="typescript">language</Code> prop for syntax highlighting.
      </p>
      <p>
        Use <Code>--save-dev</Code> for development-only packages.
      </p>
    </div>
  ),
};

export const AutoDetect: Story = {
  render: () => (
    <div className="w-full max-w-2xl bg-base p-6">
      <CodeSnippet code={TS_EXAMPLE} />
    </div>
  ),
};
