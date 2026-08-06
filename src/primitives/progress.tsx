import * as ProgressPrimitive from '@radix-ui/react-progress';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementRef,
} from 'react';

import { cn } from '../internal/cn';

export interface ProgressProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  showValue?: boolean;
  valueLabel?: (value: number) => string;
}

type ProgressStyle = CSSProperties & {
  '--dgf-progress-value': number;
};

export const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, showValue = false, value = 0, valueLabel, ...props }, ref) => {
  const normalizedValue = Math.min(100, Math.max(0, value ?? 0));
  return (
    <div className="dgf:flex dgf:items-center dgf:gap-2" data-slot="progress-wrap">
      <ProgressPrimitive.Root
        ref={ref}
        data-slot="progress"
        value={normalizedValue}
        className={cn(
          'dgf:relative dgf:h-2 dgf:w-full dgf:overflow-hidden dgf:rounded-full dgf:bg-[var(--dgf-color-muted)]',
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="dgf-progress-indicator dgf:h-full dgf:w-full dgf:bg-[var(--dgf-color-primary)] dgf:transition-transform"
          style={{ '--dgf-progress-value': normalizedValue } as ProgressStyle}
        />
      </ProgressPrimitive.Root>
      {showValue ? (
        <span className="dgf:min-w-10 dgf:text-right dgf:text-xs dgf:font-medium dgf:text-[var(--dgf-color-text-muted)]">
          {valueLabel?.(normalizedValue) ?? `${Math.round(normalizedValue)}%`}
        </span>
      ) : null}
    </div>
  );
});
Progress.displayName = 'Progress';
