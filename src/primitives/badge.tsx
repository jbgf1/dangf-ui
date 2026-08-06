import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type HTMLAttributes,
} from 'react';

import { cn } from '../internal/cn';

const badgeVariants = cva(
  'dgf:inline-flex dgf:items-center dgf:rounded-full dgf:border dgf:px-2.5 dgf:py-1 dgf:text-xs dgf:font-semibold',
  {
    variants: {
      tone: {
        neutral:
          'dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-muted)] dgf:text-[var(--dgf-color-text)]',
        primary:
          'dgf:border-transparent dgf:bg-[var(--dgf-color-primary)] dgf:text-[var(--dgf-color-primary-foreground)]',
        danger:
          'dgf:border-transparent dgf:bg-[var(--dgf-color-danger-surface)] dgf:text-[var(--dgf-color-danger)]',
        warning:
          'dgf:border-transparent dgf:bg-[var(--dgf-color-warning-surface)] dgf:text-[var(--dgf-color-warning)]',
        info:
          'dgf:border-transparent dgf:bg-[var(--dgf-color-info-surface)] dgf:text-[var(--dgf-color-info)]',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ className, tone }))}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';

export { badgeVariants };
