import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type HTMLAttributes,
} from 'react';

import { cn } from '../../internal/cn';

const glowCardVariants = cva(
  'dgf:rounded-[var(--dgf-radius-xl)] dgf:border dgf:p-6 dgf:transition dgf:duration-200',
  {
    variants: {
      tone: {
        surface:
          'dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:shadow-[var(--dgf-shadow-sm)]',
        translucent:
          'dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)]/75 dgf:shadow-[var(--dgf-shadow-md)] dgf:backdrop-blur',
        accent:
          'dgf:border-[var(--dgf-color-primary)]/25 dgf:bg-[color-mix(in_srgb,var(--dgf-color-primary)_10%,var(--dgf-color-surface))] dgf:shadow-[var(--dgf-shadow-md)]',
      },
      align: {
        left: 'dgf:text-left',
        center: 'dgf:text-center',
      },
      interactive: {
        true: 'dgf:hover:-translate-y-1 dgf:hover:shadow-[var(--dgf-shadow-lg)]',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'surface',
      align: 'left',
      interactive: false,
    },
  },
);

export interface GlowCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glowCardVariants> {}

export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(
  ({ align, className, interactive, tone, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="glow-card"
      className={cn('dgf-root', glowCardVariants({ align, className, interactive, tone }))}
      {...props}
    />
  ),
);
GlowCard.displayName = 'GlowCard';

export { glowCardVariants };
