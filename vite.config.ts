import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const externalPackages = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'class-variance-authority',
  'clsx',
  'lucide-react',
];

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/test/**'],
      insertTypesEntry: false,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        patterns: resolve(import.meta.dirname, 'src/patterns/index.ts'),
        media: resolve(import.meta.dirname, 'src/media/index.ts'),
        marketing: resolve(import.meta.dirname, 'src/patterns/marketing/index.ts'),
      },
    },
    sourcemap: true,
    cssCodeSplit: true,
    rollupOptions: {
      external: (id) =>
        externalPackages.includes(id) ||
        id.startsWith('@radix-ui/') ||
        id.startsWith('react/'),
      output: [
        {
          format: 'es',
          banner: '"use client";',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
        },
        {
          format: 'cjs',
          banner: '"use client";',
          exports: 'named',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
        },
      ],
    },
  },
});
