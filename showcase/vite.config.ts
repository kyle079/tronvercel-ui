import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/tronvercel-ui/',
  resolve: {
    alias: {
      '@tronvercel/ui': resolve(__dirname, '../src/index.ts'),
      '@': resolve(__dirname, '../src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
