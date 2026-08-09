import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const baseStylesPath = resolve(process.cwd(), 'src/styles/index.css');
const warmStylesPath = resolve(process.cwd(), 'src/styles/themes/warm.css');

describe('style contract', () => {
  it('uses namespaced design tokens and omits global preflight selectors', async () => {
    const css = await readFile(baseStylesPath, 'utf8');
    expect(css).toContain('--dgf-color-primary');
    expect(css).toContain('--dgf-shadow-keycap');
    expect(css).toContain("prefix(dgf)");
    expect(css).not.toMatch(/(^|\n)\s*(html|body|\*)\s*\{/);
    expect(css).not.toContain('preflight.css');
  });

  it('ships the warm theme as an opt-in adapter', async () => {
    const css = await readFile(warmStylesPath, 'utf8');
    expect(css).toContain('.dgf-theme-warm');
    expect(css).toContain("[data-dgf-theme='warm']");
    expect(css).toContain('--dgf-color-canvas: #f8f1e8');
  });
});
