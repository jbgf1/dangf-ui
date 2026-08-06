import type { HTMLAttributes } from 'react';

import { cn } from '../internal/cn';
import { Spinner } from '../primitives/spinner';

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  label?: string;
}

export function LoadingOverlay({
  active,
  className,
  label = 'Loading',
  ...props
}: LoadingOverlayProps) {
  if (!active) {
    return null;
  }
  return (
    <div
      data-slot="loading-overlay"
      aria-busy="true"
      aria-live="polite"
      className={cn(
        'dgf-root dgf:absolute dgf:inset-0 dgf:z-20 dgf:flex dgf:items-center dgf:justify-center dgf:rounded-[inherit] dgf:bg-[var(--dgf-color-surface)]/70 dgf:backdrop-blur-[1px]',
        className,
      )}
      {...props}
    >
      <div className="dgf:flex dgf:flex-col dgf:items-center dgf:gap-2">
        <Spinner label={label} />
        <span className="dgf:text-xs dgf:text-[var(--dgf-color-text-muted)]">
          {label}
        </span>
      </div>
    </div>
  );
}
