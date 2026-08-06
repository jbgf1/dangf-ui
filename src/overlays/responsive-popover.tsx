import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import {
  cloneElement,
  useEffect,
  useState,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '../internal/cn';
import { Button } from '../primitives/button';
import { Spinner } from '../primitives/spinner';
import { Drawer } from './drawer';

interface TriggerProps {
  onClick?: MouseEventHandler<HTMLElement>;
  'aria-expanded'?: boolean;
}

export interface ResponsivePopoverProps {
  trigger: ReactElement<TriggerProps>;
  content: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  mobileBreakpoint?: number;
  mobileTitle?: ReactNode;
  mobileDescription?: ReactNode;
  showCloseButton?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  className?: string;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export function ResponsivePopover({
  align = 'end',
  className,
  content,
  defaultOpen = false,
  loading = false,
  loadingLabel = 'Loading',
  mobileBreakpoint = 640,
  mobileDescription,
  mobileTitle,
  onOpenChange,
  open: controlledOpen,
  showCloseButton = true,
  side = 'bottom',
  sideOffset = 8,
  trigger,
}: ResponsivePopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint - 1}px)`);
  const setOpen = (nextOpen: boolean) => {
    if (loading && !nextOpen) {
      return;
    }
    if (controlledOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  if (isMobile) {
    const mobileTrigger = cloneElement(trigger, {
      'aria-expanded': open,
      onClick: (event: MouseEvent<HTMLElement>) => {
        trigger.props.onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      },
    });
    return (
      <>
        {mobileTrigger}
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title={mobileTitle}
          description={mobileDescription}
          ariaLabel={typeof mobileTitle === 'string' ? mobileTitle : 'Popover'}
          size="md"
          loading={loading}
          loadingLabel={loadingLabel}
        >
          {content}
        </Drawer>
      </>
    );
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="responsive-popover"
          aria-busy={loading}
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={12}
          className={cn(
            'dgf-popover-content dgf-root dgf:relative dgf:z-[120] dgf:max-h-[min(36rem,calc(100dvh-1.5rem))] dgf:w-[min(24rem,calc(100vw-1.5rem))] dgf:overflow-y-auto dgf:rounded-[var(--dgf-radius-lg)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface-raised)] dgf:p-4 dgf:text-[var(--dgf-color-text)] dgf:shadow-[var(--dgf-shadow-lg)] dgf:focus:outline-none',
            className,
          )}
        >
          {showCloseButton ? (
            <PopoverPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close popover"
                disabled={loading}
                className="dgf:absolute dgf:right-2 dgf:top-2"
              >
                <X />
              </Button>
            </PopoverPrimitive.Close>
          ) : null}
          {content}
          {loading ? (
            <div
              data-slot="responsive-popover-loading"
              className="dgf:absolute dgf:inset-0 dgf:z-10 dgf:flex dgf:items-center dgf:justify-center dgf:bg-[var(--dgf-color-surface-raised)]/75 dgf:backdrop-blur-[1px]"
            >
              <span className="dgf:flex dgf:items-center dgf:gap-2 dgf:rounded-full dgf:bg-[var(--dgf-color-surface)] dgf:px-4 dgf:py-2 dgf:text-sm dgf:font-medium dgf:shadow-[var(--dgf-shadow-sm)]">
                <Spinner label={loadingLabel} />
                {loadingLabel}
              </span>
            </div>
          ) : null}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
