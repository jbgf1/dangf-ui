import { describe, expect, it } from 'vitest';

import * as core from './index';
import * as media from './media';
import * as patterns from './patterns';
import * as marketing from './patterns/marketing';

describe('public source entries', () => {
  it('exposes the documented root modules', () => {
    expect(core).toHaveProperty('Button');
    expect(core).toHaveProperty('KeycapButton');
    expect(core).toHaveProperty('Dialog');
    expect(core).toHaveProperty('ResponsivePopover');
  });

  it('keeps patterns, media, and marketing in dedicated entries', () => {
    expect(patterns).toHaveProperty('SplitDialog');
    expect(media).toHaveProperty('ImageDropzone');
    expect(marketing).toHaveProperty('Section');
  });
});
