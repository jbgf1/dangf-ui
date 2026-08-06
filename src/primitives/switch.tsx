import * as SwitchPrimitive from '@radix-ui/react-switch';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '../internal/cn';

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
}

export const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, ...props }, ref) => (
  <label className="dgf:inline-flex dgf:items-center dgf:gap-2 dgf:text-sm dgf:text-[var(--dgf-color-text)]">
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        'dgf:relative dgf:inline-flex dgf:h-6 dgf:w-11 dgf:shrink-0 dgf:cursor-pointer dgf:items-center dgf:rounded-full dgf:bg-[var(--dgf-color-muted)] dgf:transition-colors dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:data-[state=checked]:bg-[var(--dgf-color-primary)] dgf:disabled:cursor-not-allowed dgf:disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="dgf:pointer-events-none dgf:block dgf:size-5 dgf:translate-x-0.5 dgf:rounded-full dgf:bg-white dgf:shadow-[var(--dgf-shadow-sm)] dgf:transition-transform dgf:data-[state=checked]:translate-x-[22px]" />
    </SwitchPrimitive.Root>
    {label ? <span>{label}</span> : null}
  </label>
));
Switch.displayName = 'Switch';
