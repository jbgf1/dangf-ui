import * as SliderPrimitive from '@radix-ui/react-slider';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '../internal/cn';

export interface SliderProps
  extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbLabel?: string;
}

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      defaultValue,
      max = 100,
      min = 0,
      thumbLabel,
      value,
      ...props
    },
    ref,
  ) => {
    const values = value ?? defaultValue ?? [min];
    const controlledProps = value === undefined ? {} : { value };
    const defaultProps =
      defaultValue === undefined
        ? value === undefined
          ? { defaultValue: [min] }
          : {}
        : { defaultValue };

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        className={cn(
          'dgf:relative dgf:flex dgf:w-full dgf:touch-none dgf:select-none dgf:items-center dgf:data-[disabled]:opacity-50',
          className,
        )}
        min={min}
        max={max}
        {...controlledProps}
        {...defaultProps}
        {...props}
      >
        <SliderPrimitive.Track className="dgf:relative dgf:h-2 dgf:w-full dgf:grow dgf:overflow-hidden dgf:rounded-full dgf:bg-[var(--dgf-color-muted)]">
          <SliderPrimitive.Range className="dgf:absolute dgf:h-full dgf:bg-[var(--dgf-color-primary)]" />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            aria-label={thumbLabel}
            className="dgf:block dgf:size-4 dgf:rounded-full dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface-raised)] dgf:shadow-[var(--dgf-shadow-sm)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)]"
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = 'Slider';
