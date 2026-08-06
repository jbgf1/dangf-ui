import {
  createElement,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../internal/cn';

const headingVariants = cva(
  'dgf:font-semibold dgf:tracking-tight dgf:text-[var(--dgf-color-text)]',
  {
    variants: {
      align: {
        left: 'dgf:text-left',
        center: 'dgf:text-center',
      },
      size: {
        sm: 'dgf:text-2xl',
        md: 'dgf:text-3xl',
        lg: 'dgf:text-4xl',
      },
    },
    defaultVariants: {
      align: 'left',
      size: 'md',
    },
  },
);

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: ElementType;
  eyebrow?: ReactNode;
  description?: ReactNode;
}

export function SectionHeading({
  align,
  as = 'h2',
  children,
  className,
  description,
  eyebrow,
  size,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      data-slot="section-heading"
      className={cn(
        'dgf-root dgf:space-y-2',
        align === 'center' && 'dgf:text-center',
      )}
    >
      {eyebrow ? (
        <div className="dgf:text-sm dgf:font-semibold dgf:uppercase dgf:tracking-[0.16em] dgf:text-[var(--dgf-color-primary)]">
          {eyebrow}
        </div>
      ) : null}
      {createElement(
        as,
        {
          ...props,
          className: cn(headingVariants({ align, className, size })),
        },
        children,
      )}
      {description ? (
        <div className="dgf:text-base dgf:leading-7 dgf:text-[var(--dgf-color-text-muted)]">
          {description}
        </div>
      ) : null}
    </div>
  );
}

export { headingVariants };
