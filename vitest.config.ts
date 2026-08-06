import { resolve } from 'node:path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/ssr-import.test.ts'],
          setupFiles: [resolve(import.meta.dirname, 'src/test/setup.ts')],
          restoreMocks: true,
        },
      },
      {
        test: {
          name: 'ssr',
          environment: 'node',
          include: ['src/ssr-import.test.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: resolve(import.meta.dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: [resolve(import.meta.dirname, '.storybook/vitest.setup.ts')],
        },
      },
    ],
  },
});
