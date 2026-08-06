import { Search, X } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '../internal/cn';
import { Button } from '../primitives/button';
import { Input } from '../primitives/input';

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
  clearLabel?: string;
  containerClassName?: string;
}

export function SearchInput({
  className,
  clearLabel = 'Clear search',
  containerClassName,
  onValueChange,
  placeholder = 'Search',
  value,
  ...props
}: SearchInputProps) {
  return (
    <div
      data-slot="search-input"
      className={cn('dgf-root dgf:relative', containerClassName)}
    >
      <Search
        aria-hidden="true"
        className="dgf:pointer-events-none dgf:absolute dgf:left-3 dgf:top-1/2 dgf:size-4 dgf:-translate-y-1/2 dgf:text-[var(--dgf-color-text-muted)]"
      />
      <Input
        type="search"
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        className={cn('dgf:pl-9 dgf:pr-10', className)}
        {...props}
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={clearLabel}
          onClick={() => onValueChange('')}
          className="dgf:absolute dgf:right-0 dgf:top-0"
        >
          <X />
        </Button>
      ) : null}
    </div>
  );
}
