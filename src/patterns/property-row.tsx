import { ChevronRight } from 'lucide-react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '../internal/cn';
import { Button } from '../primitives/button';

export interface PropertyRowProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  icon?: ReactNode;
  label: ReactNode;
  value?: ReactNode;
  secondaryValue?: ReactNode;
  affordance?: ReactNode;
  expanded?: boolean;
  interactive?: boolean;
}

export const PropertyRow = forwardRef<HTMLButtonElement, PropertyRowProps>(
  (
    {
      affordance,
      className,
      expanded = false,
      icon,
      interactive = true,
      label,
      secondaryValue,
      value,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        {icon ? (
          <span className="dgf:flex dgf:size-5 dgf:shrink-0 dgf:items-center dgf:justify-center dgf:text-[var(--dgf-color-text-muted)] dgf:[&_svg]:size-4">
            {icon}
          </span>
        ) : null}
        <span className="dgf:min-w-0 dgf:flex-1 dgf:text-left">
          <span className="dgf:block dgf:text-sm dgf:font-medium">{label}</span>
          {value ? (
            <span className="dgf:mt-0.5 dgf:block dgf:truncate dgf:text-xs dgf:text-[var(--dgf-color-text-muted)]">
              {value}
            </span>
          ) : null}
          {secondaryValue ? (
            <span className="dgf:mt-0.5 dgf:block dgf:truncate dgf:text-xs dgf:text-[var(--dgf-color-text-muted)]">
              {secondaryValue}
            </span>
          ) : null}
        </span>
        {affordance ?? (interactive ? <ChevronRight className="dgf:size-4" /> : null)}
      </>
    );

    if (!interactive) {
      return (
        <div
          data-slot="property-row"
          className={cn(
            'dgf-root dgf:flex dgf:items-center dgf:gap-3 dgf:rounded-[var(--dgf-radius-md)] dgf:px-3 dgf:py-2.5',
            className,
          )}
        >
          {content}
        </div>
      );
    }

    return (
      <Button
        ref={ref}
        data-slot="property-row"
        type="button"
        variant="ghost"
        aria-expanded={expanded}
        className={cn(
          'dgf:h-auto dgf:w-full dgf:justify-start dgf:gap-3 dgf:px-3 dgf:py-2.5',
          expanded && 'dgf:bg-[var(--dgf-color-muted)]',
          className,
        )}
        {...props}
      >
        {content}
      </Button>
    );
  },
);
PropertyRow.displayName = 'PropertyRow';
