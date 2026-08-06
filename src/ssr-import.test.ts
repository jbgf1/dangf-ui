import { describe, expect, it } from 'vitest';

describe('SSR imports', () => {
  it('loads every public JavaScript entry without browser globals', async () => {
    expect(globalThis).not.toHaveProperty('document');
    const [core, patterns, media, marketing] = await Promise.all([
      import('./index'),
      import('./patterns'),
      import('./media'),
      import('./patterns/marketing'),
    ]);
    expect(core).toHaveProperty('Dialog');
    expect(patterns).toHaveProperty('SplitDialog');
    expect(media).toHaveProperty('ImageDropzone');
    expect(marketing).toHaveProperty('Section');
  });
});
