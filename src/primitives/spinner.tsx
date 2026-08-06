import { LoaderCircle } from 'lucide-react';
import type { HTMLAttributes } from 'react';

import { cn } from '../internal/cn';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

export function Spinner({ className, label = 'Loading', ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn(
        'dgf:inline-flex dgf:items-center dgf:justify-center dgf:text-[var(--dgf-color-primary)]',
        className,
      )}
      {...props}
    >
      <LoaderCircle aria-hidden="true" className="dgf:size-5 dgf:animate-spin" />
    </span>
  );
}
