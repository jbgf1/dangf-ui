import { ChevronRight } from 'lucide-react';
import type { HTMLAttributes } from 'react';

import { cn } from '../internal/cn';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  items: readonly BreadcrumbItem[];
  onSelect?: (item: BreadcrumbItem) => void;
  ariaLabel?: string;
}

export function Breadcrumb({
  ariaLabel = 'Breadcrumb',
  className,
  items,
  onSelect,
  ...props
}: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <nav
      data-slot="breadcrumb"
      aria-label={ariaLabel}
      className={cn('dgf-root dgf:w-full', className)}
      {...props}
    >
      <ol className="dgf:flex dgf:flex-wrap dgf:items-center dgf:gap-1.5 dgf:text-sm dgf:text-[var(--dgf-color-text-muted)]">
        {items.map((item, index) => (
          <li key={item.id} className="dgf:flex dgf:items-center dgf:gap-1.5">
            {index > 0 ? (
              <ChevronRight aria-hidden="true" className="dgf:size-3.5" />
            ) : null}
            {item.href && !item.current ? (
              <a
                href={item.href}
                onClick={(event) => {
                  if (onSelect) {
                    event.preventDefault();
                    onSelect(item);
                  }
                }}
                className="dgf:rounded dgf:transition-colors dgf:hover:text-[var(--dgf-color-text)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)]"
              >
                {item.label}
              </a>
            ) : onSelect && !item.current ? (
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="dgf:cursor-pointer dgf:rounded dgf:hover:text-[var(--dgf-color-text)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)]"
              >
                {item.label}
              </button>
            ) : (
              <span
                aria-current={item.current ? 'page' : undefined}
                className={cn(
                  item.current && 'dgf:font-semibold dgf:text-[var(--dgf-color-text)]',
                )}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
