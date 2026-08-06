import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import {
  CircleAlert,
  CircleHelp,
  TriangleAlert,
} from 'lucide-react';
import {
  useState,
  type ReactNode,
} from 'react';

import { cn } from '../internal/cn';
import { useReturnFocus } from '../internal/use-return-focus';
import { Button } from '../primitives/button';

export type ConfirmDialogTone = 'danger' | 'warning' | 'info';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmDialogTone;
  loading?: boolean;
  icon?: ReactNode;
  onConfirm: () => void | Promise<void>;
  onConfirmError?: (error: unknown) => void;
}

const toneStyles: Record<
  ConfirmDialogTone,
  { icon: string; button: 'danger' | 'primary' | 'secondary'; fallback: ReactNode }
> = {
  danger: {
    icon: 'dgf:bg-[var(--dgf-color-danger-surface)] dgf:text-[var(--dgf-color-danger)]',
    button: 'danger',
    fallback: <CircleAlert />,
  },
  warning: {
    icon: 'dgf:bg-[var(--dgf-color-warning-surface)] dgf:text-[var(--dgf-color-warning)]',
    button: 'primary',
    fallback: <TriangleAlert />,
  },
  info: {
    icon: 'dgf:bg-[var(--dgf-color-info-surface)] dgf:text-[var(--dgf-color-info)]',
    button: 'primary',
    fallback: <CircleHelp />,
  },
};

export function ConfirmDialog({
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  description,
  icon,
  loading,
  onConfirm,
  onConfirmError,
  onOpenChange,
  open,
  title,
  tone = 'danger',
}: ConfirmDialogProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const { captureReturnFocus, restoreReturnFocus } = useReturnFocus();
  const isLoading = loading ?? internalLoading;
  const styles = toneStyles[tone];

  const confirm = async () => {
    if (isLoading) {
      return;
    }
    setInternalLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      onConfirmError?.(error);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <AlertDialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isLoading) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="dgf-dialog-overlay dgf-root dgf:fixed dgf:inset-0 dgf:z-[110] dgf:bg-black/50" />
        <AlertDialogPrimitive.Content
          data-slot="confirm-dialog"
          onOpenAutoFocus={captureReturnFocus}
          onCloseAutoFocus={restoreReturnFocus}
          onEscapeKeyDown={(event) => {
            if (isLoading) {
              event.preventDefault();
            }
          }}
          className="dgf-dialog-content dgf-root dgf:fixed dgf:left-1/2 dgf:top-1/2 dgf:z-[111] dgf:w-[calc(100vw-1.5rem)] dgf:max-w-md dgf:-translate-x-1/2 dgf:-translate-y-1/2 dgf:rounded-[var(--dgf-radius-xl)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:shadow-[var(--dgf-shadow-lg)] dgf:focus:outline-none"
        >
          <div className="dgf:flex dgf:items-start dgf:gap-4 dgf:p-5 dgf:sm:p-6">
            <span
              className={cn(
                'dgf:flex dgf:size-12 dgf:shrink-0 dgf:items-center dgf:justify-center dgf:rounded-[var(--dgf-radius-md)] dgf:[&_svg]:size-6',
                styles.icon,
              )}
            >
              {icon ?? styles.fallback}
            </span>
            <div className="dgf:min-w-0 dgf:flex-1">
              <AlertDialogPrimitive.Title className="dgf:text-lg dgf:font-semibold">
                {title}
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="dgf:mt-2 dgf:text-sm dgf:leading-6 dgf:text-[var(--dgf-color-text-muted)]">
                {description}
              </AlertDialogPrimitive.Description>
            </div>
          </div>
          <div className="dgf:flex dgf:items-center dgf:justify-end dgf:gap-3 dgf:border-t dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-panel)]/40 dgf:p-4">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="outline" disabled={isLoading}>
                {cancelLabel}
              </Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button
                variant={styles.button}
                disabled={isLoading}
                onClick={(event) => {
                  event.preventDefault();
                  void confirm();
                }}
              >
                {isLoading ? `${confirmLabel}…` : confirmLabel}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
