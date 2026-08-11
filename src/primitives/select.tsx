import { ChevronDown } from 'lucide-react';
import {
  forwardRef,
  type ChangeEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react';

import { cn } from '../internal/cn';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
  icon?: ReactNode;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      containerClassName,
      disabled,
      icon = <ChevronDown />,
      multiple,
      onChange,
      onValueChange,
      size,
      ...props
    },
    ref,
  ) => {
    const isListbox = multiple || (size !== undefined && size > 1);
    const showIcon = Boolean(icon) && !isListbox;

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event);
      onValueChange?.(event.currentTarget.value);
    };

    return (
      <span
        data-slot="select-root"
        className={cn(
          'dgf-root dgf:relative dgf:block dgf:w-full',
          containerClassName,
        )}
      >
        <select
          ref={ref}
          data-slot="select"
          disabled={disabled}
          multiple={multiple}
          size={size}
          onChange={handleChange}
          className={cn(
            'dgf:flex dgf:w-full dgf:appearance-none dgf:rounded-[var(--dgf-radius-sm)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:px-3 dgf:py-2 dgf:text-sm dgf:text-[var(--dgf-color-text)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:disabled:cursor-not-allowed dgf:disabled:opacity-50',
            isListbox ? 'dgf:h-auto' : 'dgf:h-10',
            showIcon && 'dgf:pr-11',
            className,
          )}
          {...props}
        />
        {showIcon ? (
          <span
            aria-hidden="true"
            data-slot="select-icon"
            className={cn(
              'dgf:pointer-events-none dgf:absolute dgf:right-4 dgf:top-1/2 dgf:flex dgf:-translate-y-1/2 dgf:items-center dgf:justify-center dgf:text-[var(--dgf-color-text-muted)] dgf:[&_svg]:size-4 dgf:[&_svg]:shrink-0',
              disabled && 'dgf:opacity-50',
            )}
          >
            {icon}
          </span>
        ) : null}
      </span>
    );
  },
);

Select.displayName = 'Select';
