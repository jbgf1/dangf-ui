import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '../internal/cn';
import { useReturnFocus } from '../internal/use-return-focus';
import { Button } from '../primitives/button';
import { Spinner } from '../primitives/spinner';

export type DrawerSide = 'bottom' | 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  ariaLabel?: string;
  footer?: ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  modal?: boolean;
  closeOnOverlayClick?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  showCloseButton?: boolean;
  className?: string;
  bodyClassName?: string;
}

const horizontalSizeClasses: Record<DrawerSize, string> = {
  sm: 'dgf:w-[min(24rem,100vw)]',
  md: 'dgf:w-[min(32rem,100vw)]',
  lg: 'dgf:w-[min(42rem,100vw)]',
  full: 'dgf:w-screen',
};

const bottomSizeClasses: Record<DrawerSize, string> = {
  sm: 'dgf:max-h-[45dvh]',
  md: 'dgf:max-h-[65dvh]',
  lg: 'dgf:max-h-[85dvh]',
  full: 'dgf:h-dvh',
};

export function Drawer({
  ariaLabel,
  bodyClassName,
  children,
  className,
  closeOnOverlayClick = true,
  description,
  footer,
  loading = false,
  loadingLabel = 'Loading',
  modal = true,
  onOpenChange,
  open,
  showCloseButton = true,
  side = 'bottom',
  size = 'md',
  title,
}: DrawerProps) {
  const { captureReturnFocus, restoreReturnFocus } = useReturnFocus();
  const sideClasses =
    side === 'bottom'
      ? cn(
          'dgf:inset-x-0 dgf:bottom-0 dgf:rounded-t-[var(--dgf-radius-xl)]',
          bottomSizeClasses[size],
        )
      : cn(
          'dgf:inset-y-0',
          side === 'right'
            ? 'dgf:right-0 dgf:rounded-l-[var(--dgf-radius-xl)]'
            : 'dgf:left-0 dgf:rounded-r-[var(--dgf-radius-xl)]',
          horizontalSizeClasses[size],
        );

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading || nextOpen) {
          onOpenChange(nextOpen);
        }
      }}
      modal={modal}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dgf-drawer-overlay dgf-root dgf:fixed dgf:inset-0 dgf:z-[100] dgf:bg-black/50" />
        <DialogPrimitive.Content
          data-slot="drawer"
          data-side={side}
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
            'dgf-drawer-content dgf-root dgf:fixed dgf:z-[101] dgf:flex dgf:flex-col dgf:overflow-hidden dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:shadow-[var(--dgf-shadow-lg)] dgf:focus:outline-none',
            sideClasses,
            className,
          )}
        >
          {title || description || showCloseButton ? (
            <header className="dgf:flex dgf:items-start dgf:gap-4 dgf:border-b dgf:border-[var(--dgf-color-border)] dgf:p-4 dgf:sm:p-5">
              <div className="dgf:min-w-0 dgf:flex-1">
                {title ? (
                  <DialogPrimitive.Title className="dgf:text-base dgf:font-semibold">
                    {title}
                  </DialogPrimitive.Title>
                ) : null}
                {description ? (
                  <DialogPrimitive.Description className="dgf:mt-1 dgf:text-sm dgf:text-[var(--dgf-color-text-muted)]">
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {showCloseButton ? (
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close drawer"
                    disabled={loading}
                  >
                    <X />
                  </Button>
                </DialogPrimitive.Close>
              ) : null}
            </header>
          ) : null}
          <div
            data-slot="drawer-body"
            className={cn(
              'dgf:min-h-0 dgf:flex-1 dgf:overflow-y-auto dgf:p-4 dgf:sm:p-5',
              bodyClassName,
            )}
          >
            {children}
          </div>
          {footer ? (
            <footer
              data-slot="drawer-footer"
              className="dgf:border-t dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:p-4 dgf:sm:p-5"
            >
              {footer}
            </footer>
          ) : null}
          {loading ? (
            <div
              data-slot="drawer-loading"
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
