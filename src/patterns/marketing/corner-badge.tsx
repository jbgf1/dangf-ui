import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../internal/cn';

export interface CornerBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  corner?: 'top-left' | 'top-right';
}

export function CornerBadge({
  children,
  className,
  corner = 'top-right',
  ...props
}: CornerBadgeProps) {
  return (
    <span
      data-slot="corner-badge"
      className={cn(
        'dgf-root dgf:absolute dgf:z-10 dgf:bg-[var(--dgf-color-primary)] dgf:px-3 dgf:py-1 dgf:text-xs dgf:font-semibold dgf:text-[var(--dgf-color-primary-foreground)] dgf:shadow-[var(--dgf-shadow-sm)]',
        corner === 'top-right'
          ? 'dgf:right-0 dgf:top-0 dgf:rounded-bl-[var(--dgf-radius-md)] dgf:rounded-tr-[inherit]'
          : 'dgf:left-0 dgf:top-0 dgf:rounded-br-[var(--dgf-radius-md)] dgf:rounded-tl-[inherit]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
