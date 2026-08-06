import {
  createElement,
  type ElementType,
  type HTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../internal/cn';

const sectionVariants = cva('dgf:w-full dgf:px-6', {
  variants: {
    tone: {
      canvas: 'dgf:bg-[var(--dgf-color-canvas)]',
      surface: 'dgf:bg-[var(--dgf-color-surface)]',
      panel: 'dgf:bg-[var(--dgf-color-panel)]/40',
    },
    spacing: {
      none: 'dgf:py-0',
      cozy: 'dgf:py-8',
      relaxed: 'dgf:py-16',
      roomy: 'dgf:py-24',
    },
  },
  defaultVariants: {
    tone: 'canvas',
    spacing: 'relaxed',
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: ElementType;
  contained?: boolean;
  containerClassName?: string;
}

export function Section({
  as = 'section',
  children,
  className,
  contained = true,
  containerClassName,
  spacing,
  tone,
  ...props
}: SectionProps) {
  const content = contained
    ? createElement(
        'div',
        {
          className: cn('dgf:mx-auto dgf:w-full dgf:max-w-7xl', containerClassName),
        },
        children,
      )
    : children;
  return createElement(
    as,
    {
      ...props,
      'data-slot': 'section',
      className: cn('dgf-root', sectionVariants({ className, spacing, tone })),
    },
    content,
  );
}

export { sectionVariants };
