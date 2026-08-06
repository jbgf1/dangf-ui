import type { HTMLAttributes } from 'react';

import { cn } from '../internal/cn';

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn('dgf-skeleton dgf:rounded-[var(--dgf-radius-sm)]', className)}
      {...props}
    />
  );
}
