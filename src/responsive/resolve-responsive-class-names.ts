import { responsiveBreakpointNames } from './types';
import type {
  ResponsiveBreakpoint,
  ResponsiveValue,
  ResponsiveValueMap,
} from './types';

type VariantClassNames<T extends string> = Readonly<Record<T, string>>;

function addBreakpointVariant(
  classNames: string,
  breakpoint: ResponsiveBreakpoint,
): string {
  return classNames
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => {
      if (!className.startsWith('dgf:')) {
        throw new Error(`Responsive classes must use the dgf prefix: ${className}`);
      }

      return `dgf:${breakpoint}:${className.slice(4)}`;
    })
    .join(' ');
}

export function isResponsiveValueMap<T>(
  value: ResponsiveValue<T> | null | undefined,
): value is ResponsiveValueMap<T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function getResponsiveBaseValue<T>(
  value: ResponsiveValue<T> | null | undefined,
  defaultValue: T,
): T {
  if (!isResponsiveValueMap(value)) return value ?? defaultValue;
  return value.base ?? defaultValue;
}

export function resolveResponsiveClassNames<T extends string>(
  value: ResponsiveValue<T> | null | undefined,
  variantClassNames: VariantClassNames<T>,
): string | undefined {
  if (!isResponsiveValueMap(value)) return undefined;

  const resolvedClassNames = responsiveBreakpointNames.flatMap((breakpoint) => {
    const breakpointValue = value[breakpoint];
    if (breakpointValue === undefined) return [];

    return addBreakpointVariant(
      variantClassNames[breakpointValue],
      breakpoint,
    );
  });

  return resolvedClassNames.length > 0
    ? resolvedClassNames.join(' ')
    : undefined;
}
