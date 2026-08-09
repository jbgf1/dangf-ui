import { cva, type VariantProps } from 'class-variance-authority';

export const keycapButtonResponsiveSizeClassNames = {
  sm: 'dgf:h-9 dgf:min-w-9 dgf:text-xs',
  md: 'dgf:h-11 dgf:min-w-11 dgf:text-sm',
  lg: 'dgf:h-13 dgf:min-w-13 dgf:text-base',
  icon: 'dgf:size-11',
  'icon-compact': 'dgf:size-11',
} as const;

export type KeycapButtonSize =
  keyof typeof keycapButtonResponsiveSizeClassNames;

const keycapButtonSizeClassNames = {
  ...keycapButtonResponsiveSizeClassNames,
  'icon-compact': 'dgf:size-11 dgf:bg-transparent! dgf:shadow-none!',
} satisfies Record<KeycapButtonSize, string>;

export const keycapButtonVariants = cva(
  'dgf:group dgf:relative dgf:inline-grid dgf:cursor-pointer dgf:appearance-none dgf:place-items-center dgf:border-0 dgf:p-0 dgf:shadow-[var(--dgf-shadow-keycap)] dgf:transition-[transform,box-shadow] dgf:duration-[var(--dgf-motion-fast)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:focus-visible:ring-offset-2 dgf:active:translate-y-0.5 dgf:active:shadow-[var(--dgf-shadow-sm)] dgf:disabled:pointer-events-none dgf:disabled:opacity-50 dgf:disabled:shadow-none dgf:motion-reduce:transform-none',
  {
    variants: {
      size: keycapButtonSizeClassNames,
      shape: {
        rounded: 'dgf:rounded-[var(--dgf-radius-md)]',
        circle: 'dgf:aspect-square dgf:rounded-full',
      },
      tone: {
        neutral:
          'dgf:bg-[var(--dgf-color-border)] dgf:text-[var(--dgf-color-text)]',
        accent:
          'dgf:bg-[var(--dgf-color-accent)] dgf:text-[var(--dgf-color-accent)]',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'rounded',
      tone: 'neutral',
    },
  },
);

export type KeycapButtonVariantProps = VariantProps<
  typeof keycapButtonVariants
>;

export const keycapBaseSizeClassNames = {
  sm: 'dgf:inset-0',
  md: 'dgf:inset-0',
  lg: 'dgf:inset-0',
  icon: 'dgf:inset-0',
  'icon-compact': 'dgf:inset-0.5',
} as const satisfies Record<KeycapButtonSize, string>;

export const keycapBaseVariants = cva(
  'dgf:pointer-events-none dgf:absolute dgf:shadow-[var(--dgf-shadow-keycap)] dgf:transition-shadow dgf:duration-[var(--dgf-motion-fast)] dgf:group-active:shadow-[var(--dgf-shadow-sm)] dgf:group-disabled:shadow-none',
  {
    variants: {
      size: keycapBaseSizeClassNames,
      shape: {
        rounded: 'dgf:rounded-[var(--dgf-radius-md)]',
        circle: 'dgf:rounded-full',
      },
      tone: {
        neutral: 'dgf:bg-[var(--dgf-color-border)]',
        accent: 'dgf:bg-[var(--dgf-color-accent)]',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'rounded',
      tone: 'neutral',
    },
  },
);

const defaultKeycapFaceSize =
  'dgf:inset-x-0 dgf:top-0 dgf:bottom-1 dgf:group-active:bottom-0';

export const keycapFaceSizeClassNames = {
  sm: defaultKeycapFaceSize,
  md: defaultKeycapFaceSize,
  lg: defaultKeycapFaceSize,
  icon: defaultKeycapFaceSize,
  'icon-compact':
    'dgf:inset-x-0.5 dgf:top-0.5 dgf:bottom-1.5 dgf:group-active:bottom-0.5',
} as const satisfies Record<KeycapButtonSize, string>;

export const keycapFaceVariants = cva(
  'dgf:pointer-events-none dgf:absolute dgf:border dgf:transition-[bottom,filter] dgf:duration-[var(--dgf-motion-fast)] dgf:group-hover:brightness-[0.98]',
  {
    variants: {
      size: keycapFaceSizeClassNames,
      shape: {
        rounded: 'dgf:rounded-[var(--dgf-radius-md)]',
        circle: 'dgf:rounded-full',
      },
      tone: {
        neutral:
          'dgf:border-[var(--dgf-color-border)] dgf:bg-gradient-to-b dgf:from-[var(--dgf-color-surface-raised)] dgf:to-[var(--dgf-color-panel)]',
        accent:
          'dgf:border-[color-mix(in_srgb,var(--dgf-color-accent)_45%,transparent)] dgf:bg-gradient-to-b dgf:from-[color-mix(in_srgb,var(--dgf-color-accent)_10%,var(--dgf-color-surface-raised))] dgf:to-[color-mix(in_srgb,var(--dgf-color-accent)_18%,var(--dgf-color-panel))]',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'rounded',
      tone: 'neutral',
    },
  },
);

export const keycapContentSizeClassNames = {
  sm: 'dgf:px-3 dgf:[&_svg]:size-4',
  md: 'dgf:px-4 dgf:[&_svg]:size-4',
  lg: 'dgf:px-5 dgf:[&_svg]:size-5',
  icon: 'dgf:px-0 dgf:[&_svg]:size-5',
  'icon-compact': 'dgf:px-0 dgf:[&_svg]:size-[18px]',
} as const satisfies Record<KeycapButtonSize, string>;

export const keycapContentVariants = cva(
  'dgf:relative dgf:z-10 dgf:inline-flex dgf:h-full dgf:translate-y-[-2px] dgf:items-center dgf:justify-center dgf:gap-2 dgf:whitespace-nowrap dgf:font-medium dgf:transition-transform dgf:duration-[var(--dgf-motion-fast)] dgf:group-active:translate-y-0 dgf:motion-reduce:transform-none dgf:[&_svg]:pointer-events-none dgf:[&_svg]:shrink-0',
  {
    variants: {
      size: keycapContentSizeClassNames,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
