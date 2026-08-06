import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '../internal/cn';
import { useReturnFocus } from '../internal/use-return-focus';
import { Button } from '../primitives/button';
import { Spinner } from '../primitives/spinner';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  ariaLabel?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  closeOnOverlayClick?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  showCloseButton?: boolean;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: 'dgf:max-w-md',
  md: 'dgf:max-w-lg',
  lg: 'dgf:max-w-2xl',
  xl: 'dgf:max-w-4xl',
  full: 'dgf:max-w-[min(96rem,calc(100vw-2rem))]',
};

export function Dialog({
  ariaLabel,
  bodyClassName,
  children,
  className,
  closeOnOverlayClick = true,
  description,
  footer,
  headerClassName,
  loading = false,
  loadingLabel = 'Loading',
  onOpenChange,
  open,
  showCloseButton = true,
  size = 'lg',
  title,
}: DialogProps) {
  const { captureReturnFocus, restoreReturnFocus } = useReturnFocus();

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading || nextOpen) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dgf-dialog-overlay dgf-root dgf:fixed dgf:inset-0 dgf:z-[100] dgf:bg-black/50" />
        <DialogPrimitive.Content
          data-slot="dialog"
          aria-label={title ? undefined : ariaLabel}
          aria-busy={loading}
          onOpenAutoFocus={captureReturnFocus}
          onCloseAutoFocus={restoreReturnFocus}
          onEscapeKeyDown={(event) => {
            if (loading) {
              event.preventDefault();
            }
          }}
          onPointerDownOutside={(event) => {
            if (!closeOnOverlayClick || loading) {
              event.preventDefault();
            }
          }}
          className={cn(
            'dgf-dialog-content dgf-root dgf:fixed dgf:left-1/2 dgf:top-1/2 dgf:z-[101] dgf:flex dgf:max-h-[min(90dvh,56rem)] dgf:w-[calc(100vw-1.5rem)] dgf:-translate-x-1/2 dgf:-translate-y-1/2 dgf:flex-col dgf:overflow-hidden dgf:rounded-[var(--dgf-radius-xl)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:text-[var(--dgf-color-text)] dgf:shadow-[var(--dgf-shadow-lg)] dgf:focus:outline-none',
            sizeClasses[size],
            className,
          )}
        >
          {title || description || showCloseButton ? (
            <header
              className={cn(
                'dgf:flex dgf:items-start dgf:gap-4 dgf:border-b dgf:border-[var(--dgf-color-border)] dgf:p-5 dgf:sm:p-6',
                headerClassName,
              )}
            >
              <div className="dgf:min-w-0 dgf:flex-1">
                {title ? (
                  <DialogPrimitive.Title className="dgf:text-lg dgf:font-semibold">
                    {title}
                  </DialogPrimitive.Title>
                ) : null}
                {description ? (
                  <DialogPrimitive.Description className="dgf:mt-1 dgf:text-sm dgf:leading-6 dgf:text-[var(--dgf-color-text-muted)]">
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {showCloseButton ? (
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close dialog"
                    disabled={loading}
                  >
                    <X />
                  </Button>
                </DialogPrimitive.Close>
              ) : null}
            </header>
          ) : null}
          <div
            data-slot="dialog-body"
            className={cn(
              'dgf:min-h-0 dgf:flex-1 dgf:overflow-y-auto dgf:p-5 dgf:sm:p-6',
              bodyClassName,
            )}
          >
            {children}
          </div>
          {footer ? (
            <footer
              data-slot="dialog-footer"
              className="dgf:flex dgf:items-center dgf:justify-end dgf:gap-3 dgf:border-t dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-panel)]/40 dgf:p-4 dgf:sm:p-5"
            >
              {footer}
            </footer>
          ) : null}
          {loading ? (
            <div
              data-slot="dialog-loading"
              className="dgf:absolute dgf:inset-0 dgf:z-10 dgf:flex dgf:items-center dgf:justify-center dgf:bg-[var(--dgf-color-surface)]/75 dgf:backdrop-blur-[1px]"
            >
              <span className="dgf:flex dgf:items-center dgf:gap-2 dgf:rounded-full dgf:bg-[var(--dgf-color-surface)] dgf:px-4 dgf:py-2 dgf:text-sm dgf:font-medium dgf:shadow-[var(--dgf-shadow-sm)]">
                <Spinner label={loadingLabel} />
                {loadingLabel}
              </span>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
