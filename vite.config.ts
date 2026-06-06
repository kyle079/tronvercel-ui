import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      tsconfigPath: './tsconfig.build.json',
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TronvercelUi',
      fileName: 'tronvercel-ui',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-select',
        '@radix-ui/react-switch',
        '@radix-ui/react-toast',
        'lucide-react',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          '@radix-ui/react-checkbox': 'RadixCheckbox',
          '@radix-ui/react-radio-group': 'RadixRadioGroup',
          '@radix-ui/react-select': 'RadixSelect',
          '@radix-ui/react-switch': 'RadixSwitch',
          '@radix-ui/react-toast': 'RadixToast',
          'lucide-react': 'LucideReact',
          clsx: 'clsx',
          'tailwind-merge': 'tailwindMerge',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
