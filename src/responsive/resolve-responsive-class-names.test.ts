import { describe, expect, it } from 'vitest';

import {
  getResponsiveBaseValue,
  isResponsiveValueMap,
  resolveResponsiveClassNames,
} from './resolve-responsive-class-names';
import { breakpoints } from './types';

const sizeClassNames = {
  sm: 'dgf:h-8 dgf:px-3',
  md: 'dgf:h-10 dgf:px-4',
  icon: 'dgf:size-10',
} as const;

describe('responsive values', () => {
  it('publishes the mobile-first breakpoint contract', () => {
    expect(breakpoints).toEqual({
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '96rem',
    });
  });

  it('resolves scalar and responsive base values', () => {
    expect(getResponsiveBaseValue('sm', 'md')).toBe('sm');
    expect(getResponsiveBaseValue({ sm: 'icon' }, 'md')).toBe('md');
    expect(getResponsiveBaseValue({ base: 'sm', md: 'icon' }, 'md')).toBe('sm');
    expect(isResponsiveValueMap({ base: 'sm' })).toBe(true);
    expect(isResponsiveValueMap('sm')).toBe(false);
  });

  it('emits ordered, namespaced breakpoint classes', () => {
    expect(
      resolveResponsiveClassNames(
        { base: 'sm', sm: 'md', lg: 'icon' },
        sizeClassNames,
      ),
    ).toBe('dgf:sm:h-10 dgf:sm:px-4 dgf:lg:size-10');
  });

  it('rejects class recipes outside the library namespace', () => {
    expect(() =>
      resolveResponsiveClassNames(
        { sm: 'sm' },
        { sm: 'h-8' },
      ),
    ).toThrow('Responsive classes must use the dgf prefix');
  });
});
