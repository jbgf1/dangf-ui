import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { cn } from '../internal/cn';
import { Spinner } from '../primitives/spinner';

interface ActionMenuContextValue {
  busy: boolean;
  close: (force?: boolean) => void;
  setBusy: (busy: boolean) => void;
}

const ActionMenuContext = createContext<ActionMenuContextValue | null>(null);

export interface ActionMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  contentClassName?: string;
  loading?: boolean;
  loadingLabel?: string;
}

export function ActionMenu({
  align = 'end',
  children,
  contentClassName,
  defaultOpen = false,
  loading = false,
  loadingLabel = 'Loading',
  onOpenChange,
  open: controlledOpen,
  side = 'bottom',
  sideOffset = 8,
  trigger,
}: ActionMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [pending, setPending] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const busy = loading || pending;
  const setOpen = (nextOpen: boolean) => {
    if (busy && !nextOpen) {
      return;
    }
    if (controlledOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };
  const close = (force = false) => {
    if (!busy || force) {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(false);
      }
      onOpenChange?.(false);
    }
  };

  return (
    <ActionMenuContext.Provider value={{ busy, close, setBusy: setPending }}>
      <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
        <DropdownMenuPrimitive.Trigger asChild>
          {trigger}
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            data-slot="action-menu"
            aria-busy={busy}
            side={side}
            align={align}
            sideOffset={sideOffset}
            collisionPadding={8}
            className={cn(
              'dgf-root dgf:z-[120] dgf:min-w-48 dgf:rounded-[var(--dgf-radius-md)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface-raised)] dgf:p-1 dgf:text-[var(--dgf-color-text)] dgf:shadow-[var(--dgf-shadow-md)]',
              contentClassName,
            )}
          >
            {children}
            {busy ? (
              <div
                data-slot="action-menu-loading"
                className="dgf:flex dgf:items-center dgf:gap-2 dgf:px-3 dgf:py-2 dgf:text-xs dgf:text-[var(--dgf-color-text-muted)]"
              >
                <Spinner label={loadingLabel} />
                {loadingLabel}
              </div>
            ) : null}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </ActionMenuContext.Provider>
  );
}

export interface ActionMenuItemProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    'onSelect'
  > {
  icon?: ReactNode;
  tone?: 'default' | 'danger';
  closeOnSelect?: boolean;
  onSelect?: () => void | Promise<void>;
  onSelectError?: (error: unknown) => void;
}

export function ActionMenuItem({
  children,
  className,
  closeOnSelect = true,
  disabled,
  icon,
  onSelect,
  onSelectError,
  tone = 'default',
  ...props
}: ActionMenuItemProps) {
  const context = useContext(ActionMenuContext);
  return (
    <DropdownMenuPrimitive.Item
      data-slot="action-menu-item"
      className={cn(
        'dgf:flex dgf:cursor-pointer dgf:select-none dgf:items-center dgf:gap-2 dgf:rounded-[var(--dgf-radius-sm)] dgf:px-3 dgf:py-2 dgf:text-sm dgf:outline-none dgf:hover:bg-[var(--dgf-color-muted)] dgf:focus:bg-[var(--dgf-color-muted)] dgf:data-[disabled]:pointer-events-none dgf:data-[disabled]:opacity-50',
        tone === 'danger' &&
          'dgf:text-[var(--dgf-color-danger)] dgf:hover:bg-[var(--dgf-color-danger-surface)] dgf:focus:bg-[var(--dgf-color-danger-surface)]',
        className,
      )}
      disabled={Boolean(disabled || context?.busy)}
      onSelect={(event) => {
        event.preventDefault();
        if (context?.busy) {
          return;
        }
        context?.setBusy(true);
        void Promise.resolve(onSelect?.())
          .then(() => {
            if (closeOnSelect) {
              context?.close(true);
            }
          })
          .catch((error: unknown) => {
            onSelectError?.(error);
          })
          .finally(() => {
            context?.setBusy(false);
          });
      }}
      {...props}
    >
      {icon ? (
        <span className="dgf:flex dgf:size-5 dgf:shrink-0 dgf:items-center dgf:justify-center dgf:[&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      <span className="dgf:flex-1">{children}</span>
    </DropdownMenuPrimitive.Item>
  );
}

export function ActionMenuLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="action-menu-label"
      className={cn(
        'dgf:px-3 dgf:py-2 dgf:text-xs dgf:font-semibold dgf:uppercase dgf:tracking-wide dgf:text-[var(--dgf-color-text-muted)]',
        className,
      )}
      {...props}
    />
  );
}

export function ActionMenuSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="action-menu-separator"
      className={cn(
        'dgf:my-1 dgf:h-px dgf:bg-[var(--dgf-color-border)]',
        className,
      )}
      {...props}
    />
  );
}
