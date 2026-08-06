import { CircleAlert } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../internal/cn';

export interface FieldTipProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'neutral' | 'danger' | 'warning' | 'info';
  icon?: ReactNode;
}

const toneClasses: Record<NonNullable<FieldTipProps['tone']>, string> = {
  neutral:
    'dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-muted)] dgf:text-[var(--dgf-color-text-muted)]',
  danger:
    'dgf:border-[var(--dgf-color-danger)]/25 dgf:bg-[var(--dgf-color-danger-surface)] dgf:text-[var(--dgf-color-danger)]',
  warning:
    'dgf:border-[var(--dgf-color-warning)]/25 dgf:bg-[var(--dgf-color-warning-surface)] dgf:text-[var(--dgf-color-warning)]',
  info:
    'dgf:border-[var(--dgf-color-info)]/25 dgf:bg-[var(--dgf-color-info-surface)] dgf:text-[var(--dgf-color-info)]',
};

export function FieldTip({
  children,
  className,
  icon,
  tone = 'neutral',
  ...props
}: FieldTipProps) {
  return (
    <div
      data-slot="field-tip"
      role={tone === 'danger' ? 'alert' : 'note'}
      className={cn(
        'dgf:flex dgf:items-start dgf:gap-2 dgf:rounded-[var(--dgf-radius-sm)] dgf:border dgf:px-3 dgf:py-2 dgf:text-sm',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {icon ?? <CircleAlert aria-hidden="true" className="dgf:mt-0.5 dgf:size-4 dgf:shrink-0" />}
      <span>{children}</span>
    </div>
  );
}
