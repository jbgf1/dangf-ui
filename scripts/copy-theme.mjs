import { mkdir, copyFile } from 'node:fs/promises';

await mkdir(new URL('../dist/themes/', import.meta.url), { recursive: true });
await copyFile(
  new URL('../src/styles/themes/warm.css', import.meta.url),
  new URL('../dist/themes/warm.css', import.meta.url),
);
