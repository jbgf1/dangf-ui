import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '../internal/cn';

const tagVariants = cva(
  'dgf:inline-flex dgf:items-center dgf:gap-1 dgf:rounded-full dgf:border dgf:font-medium',
  {
    variants: {
      tone: {
        neutral:
          'dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-muted)] dgf:text-[var(--dgf-color-text)]',
        success:
          'dgf:border-[color-mix(in_srgb,var(--dgf-color-primary)_45%,transparent)] dgf:bg-[color-mix(in_srgb,var(--dgf-color-primary)_14%,transparent)] dgf:text-[var(--dgf-color-primary)]',
        warning:
          'dgf:border-[color-mix(in_srgb,var(--dgf-color-warning)_35%,transparent)] dgf:bg-[var(--dgf-color-warning-surface)] dgf:text-[var(--dgf-color-warning)]',
        info:
          'dgf:border-[color-mix(in_srgb,var(--dgf-color-info)_30%,transparent)] dgf:bg-[var(--dgf-color-info-surface)] dgf:text-[var(--dgf-color-info)]',
      },
      size: {
        sm: 'dgf:px-2 dgf:py-0.5 dgf:text-[11px]',
        md: 'dgf:px-3 dgf:py-1.5 dgf:text-xs',
      },
    },
    defaultVariants: {
      tone: 'neutral',
      size: 'sm',
    },
  },
);

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  icon?: ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, className, icon, size, tone, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="tag"
      className={cn(tagVariants({ className, size, tone }))}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  ),
);
Tag.displayName = 'Tag';

export { tagVariants };
