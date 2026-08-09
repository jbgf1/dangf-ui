export const responsiveBreakpointNames = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const;

export type ResponsiveBreakpoint = typeof responsiveBreakpointNames[number];

export const breakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
} as const satisfies Record<ResponsiveBreakpoint, `${number}rem`>;

export type ResponsiveValueMap<T> = {
  readonly base?: T | undefined;
} & {
  readonly [Breakpoint in ResponsiveBreakpoint]?: T | undefined;
};

export type ResponsiveValue<T> = T | ResponsiveValueMap<T>;
