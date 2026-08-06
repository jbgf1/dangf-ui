import {
  forwardRef,
  type TextareaHTMLAttributes,
} from 'react';

import { cn } from '../internal/cn';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        'dgf:flex dgf:min-h-24 dgf:w-full dgf:resize-y dgf:rounded-[var(--dgf-radius-sm)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:px-3 dgf:py-2 dgf:text-sm dgf:text-[var(--dgf-color-text)] dgf:placeholder:text-[var(--dgf-color-text-muted)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:disabled:cursor-not-allowed dgf:disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
