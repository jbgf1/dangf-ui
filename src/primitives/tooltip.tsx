import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ReactElement, ReactNode } from 'react';

import { cn } from '../internal/cn';

export interface TooltipProps {
  children: ReactElement;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  disabled?: boolean;
  contentClassName?: string;
}

export function Tooltip({
  align = 'center',
  children,
  content,
  contentClassName,
  delayDuration = 200,
  disabled = false,
  side = 'top',
}: TooltipProps) {
  if (disabled) {
    return children;
  }
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip"
            side={side}
            align={align}
            sideOffset={8}
            collisionPadding={8}
            className={cn(
              'dgf-root dgf:z-[100] dgf:max-w-xs dgf:rounded-[var(--dgf-radius-sm)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface-raised)] dgf:px-3 dgf:py-2 dgf:text-xs dgf:text-[var(--dgf-color-text)] dgf:shadow-[var(--dgf-shadow-md)]',
              contentClassName,
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="dgf:fill-[var(--dgf-color-surface-raised)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
