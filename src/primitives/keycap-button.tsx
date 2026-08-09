import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type ButtonHTMLAttributes,
} from 'react';

import { cn } from '../internal/cn';

const keycapButtonVariants = cva(
  'dgf:group dgf:relative dgf:inline-grid dgf:cursor-pointer dgf:appearance-none dgf:place-items-center dgf:border-0 dgf:p-0 dgf:shadow-[var(--dgf-shadow-keycap)] dgf:transition-[transform,box-shadow] dgf:duration-[var(--dgf-motion-fast)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:focus-visible:ring-offset-2 dgf:active:translate-y-0.5 dgf:active:shadow-[var(--dgf-shadow-sm)] dgf:disabled:pointer-events-none dgf:disabled:opacity-50 dgf:disabled:shadow-none dgf:motion-reduce:transform-none',
  {
    variants: {
      size: {
        sm: 'dgf:h-9 dgf:min-w-9 dgf:text-xs',
        md: 'dgf:h-11 dgf:min-w-11 dgf:text-sm',
        lg: 'dgf:h-13 dgf:min-w-13 dgf:text-base',
        icon: 'dgf:size-11',
      },
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

const keycapFaceVariants = cva(
  'dgf:pointer-events-none dgf:absolute dgf:inset-x-0 dgf:top-0 dgf:bottom-1 dgf:border dgf:transition-[bottom,filter] dgf:duration-[var(--dgf-motion-fast)] dgf:group-hover:brightness-[0.98] dgf:group-active:bottom-0',
  {
    variants: {
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
      shape: 'rounded',
      tone: 'neutral',
    },
  },
);

const keycapContentVariants = cva(
  'dgf:relative dgf:z-10 dgf:inline-flex dgf:h-full dgf:translate-y-[-2px] dgf:items-center dgf:justify-center dgf:gap-2 dgf:whitespace-nowrap dgf:font-medium dgf:transition-transform dgf:duration-[var(--dgf-motion-fast)] dgf:group-active:translate-y-0 dgf:motion-reduce:transform-none dgf:[&_svg]:pointer-events-none dgf:[&_svg]:shrink-0',
  {
    variants: {
      size: {
        sm: 'dgf:px-3 dgf:[&_svg]:size-4',
        md: 'dgf:px-4 dgf:[&_svg]:size-4',
        lg: 'dgf:px-5 dgf:[&_svg]:size-5',
        icon: 'dgf:px-0 dgf:[&_svg]:size-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface KeycapButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof keycapButtonVariants> {}

export const KeycapButton = forwardRef<HTMLButtonElement, KeycapButtonProps>(
  ({ children, className, shape, size, tone, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      data-slot="keycap-button"
      className={cn(keycapButtonVariants({ className, shape, size, tone }))}
      {...props}
    >
      <span
        aria-hidden="true"
        data-slot="keycap-button-face"
        className={cn(keycapFaceVariants({ shape, tone }))}
      />
      <span
        data-slot="keycap-button-content"
        className={cn(keycapContentVariants({ size }))}
      >
        {children}
      </span>
    </button>
  ),
);

KeycapButton.displayName = 'KeycapButton';

export { keycapButtonVariants };
