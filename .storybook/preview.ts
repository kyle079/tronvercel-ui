import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'base',
      values: [
        { name: 'base', value: '#0a0d0f' },
        { name: 'surface', value: '#101417' },
        { name: 'ink', value: '#06080a' },
      ],
    },
  },
};

export default preview;
