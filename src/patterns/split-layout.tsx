import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../internal/cn';

export interface SplitLayoutProps extends HTMLAttributes<HTMLDivElement> {
  primary: ReactNode;
  aside: ReactNode;
  primaryScrollable?: boolean | undefined;
  asideScrollable?: boolean | undefined;
  primaryClassName?: string | undefined;
  asideClassName?: string | undefined;
}

export function SplitLayout({
  aside,
  asideClassName,
  asideScrollable = true,
  className,
  primary,
  primaryClassName,
  primaryScrollable = true,
  ...props
}: SplitLayoutProps) {
  return (
    <div
      data-slot="split-layout"
      className={cn(
        'dgf:grid dgf:min-h-0 dgf:flex-1 dgf:sm:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)] dgf:sm:overflow-hidden',
        className,
      )}
      {...props}
    >
      <section
        className={cn(
          'dgf:min-h-0 dgf:min-w-0 dgf:p-5 dgf:sm:p-6',
          primaryScrollable ? 'dgf:sm:overflow-y-auto' : 'dgf:sm:overflow-hidden',
          primaryClassName,
        )}
      >
        {primary}
      </section>
      <aside
        className={cn(
          'dgf:min-h-0 dgf:min-w-0 dgf:border-t dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-panel)]/30 dgf:p-5 dgf:sm:border-l dgf:sm:border-t-0 dgf:sm:p-6',
          asideScrollable ? 'dgf:sm:overflow-y-auto' : 'dgf:sm:overflow-hidden',
          asideClassName,
        )}
      >
        {aside}
      </aside>
    </div>
  );
}
