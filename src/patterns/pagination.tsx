import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import type { HTMLAttributes } from 'react';

import { cn } from '../internal/cn';
import { Button } from '../primitives/button';

export interface PaginationLabels {
  previous: string;
  next: string;
  refresh: string;
  summary: (start: number, end: number, total: number) => string;
}

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  loading?: boolean;
  showSummary?: boolean;
  onRefresh?: () => void;
  labels?: Partial<PaginationLabels>;
}

const defaultLabels: PaginationLabels = {
  previous: 'Previous',
  next: 'Next',
  refresh: 'Refresh',
  summary: (start, end, total) => `${start}–${end} of ${total}`,
};

function pageWindow(page: number, totalPages: number): number[] {
  const first = Math.max(1, Math.min(page - 2, totalPages - 4));
  const last = Math.min(totalPages, first + 4);
  return Array.from({ length: Math.max(0, last - first + 1) }, (_, index) => first + index);
}

export function Pagination({
  className,
  labels,
  loading = false,
  onPageChange,
  onRefresh,
  page,
  pageSize = 20,
  showSummary = true,
  totalItems,
  totalPages,
  ...props
}: PaginationProps) {
  const copy = { ...defaultLabels, ...labels };
  const safePage = Math.min(Math.max(1, page), Math.max(1, totalPages));
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = totalItems === undefined
    ? safePage * pageSize
    : Math.min(totalItems, safePage * pageSize);

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn('dgf-root dgf:flex dgf:flex-col dgf:gap-3', className)}
      {...props}
    >
      {showSummary && totalItems !== undefined ? (
        <div className="dgf:flex dgf:items-center dgf:justify-between dgf:text-sm dgf:text-[var(--dgf-color-text-muted)]">
          <span>{copy.summary(start, end, totalItems)}</span>
          {onRefresh ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={loading}
              onClick={onRefresh}
            >
              <RefreshCw />
              {copy.refresh}
            </Button>
          ) : null}
        </div>
      ) : null}
      <div className="dgf:flex dgf:flex-wrap dgf:items-center dgf:justify-center dgf:gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={loading || safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
        >
          <ChevronLeft />
          {copy.previous}
        </Button>
        {pageWindow(safePage, totalPages).map((pageNumber) => (
          <Button
            key={pageNumber}
            type="button"
            variant={pageNumber === safePage ? 'primary' : 'outline'}
            size="sm"
            aria-current={pageNumber === safePage ? 'page' : undefined}
            disabled={loading}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={loading || safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
        >
          {copy.next}
          <ChevronRight />
        </Button>
      </div>
    </nav>
  );
}
