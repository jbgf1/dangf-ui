import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '../internal/cn';

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, ...props }, ref) => (
  <label className="dgf:inline-flex dgf:items-center dgf:gap-2 dgf:text-sm dgf:text-[var(--dgf-color-text)]">
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        'dgf:flex dgf:size-5 dgf:shrink-0 dgf:items-center dgf:justify-center dgf:rounded dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:text-[var(--dgf-color-primary-foreground)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:data-[state=checked]:border-[var(--dgf-color-primary)] dgf:data-[state=checked]:bg-[var(--dgf-color-primary)] dgf:data-[state=indeterminate]:border-[var(--dgf-color-primary)] dgf:data-[state=indeterminate]:bg-[var(--dgf-color-primary)] dgf:disabled:cursor-not-allowed dgf:disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        {props.checked === 'indeterminate' ? (
          <Minus className="dgf:size-3.5" />
        ) : (
          <Check className="dgf:size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label ? <span>{label}</span> : null}
  </label>
));
Checkbox.displayName = 'Checkbox';
