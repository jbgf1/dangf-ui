import { Inbox } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../internal/cn';

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  action,
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        'dgf-root dgf:flex dgf:flex-col dgf:items-center dgf:justify-center dgf:gap-3 dgf:rounded-[var(--dgf-radius-lg)] dgf:border dgf:border-dashed dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:px-6 dgf:py-10 dgf:text-center',
        className,
      )}
      {...props}
    >
      <span className="dgf:flex dgf:size-12 dgf:items-center dgf:justify-center dgf:rounded-full dgf:bg-[var(--dgf-color-muted)] dgf:text-[var(--dgf-color-text-muted)] dgf:[&_svg]:size-6">
        {icon ?? <Inbox />}
      </span>
      <div>
        <h3 className="dgf:font-semibold dgf:text-[var(--dgf-color-text)]">{title}</h3>
        {description ? (
          <div className="dgf:mt-1 dgf:max-w-md dgf:text-sm dgf:leading-6 dgf:text-[var(--dgf-color-text-muted)]">
            {description}
          </div>
        ) : null}
      </div>
      {action ? <div className="dgf:mt-1">{action}</div> : null}
    </div>
  );
}
