import type { ReactNode } from 'react';

import { cn } from '../internal/cn';
import {
  Dialog,
  type DialogProps,
} from '../overlays/dialog';
import { SplitLayout } from './split-layout';

export interface SplitDialogProps
  extends Omit<DialogProps, 'bodyClassName' | 'children'> {
  primary: ReactNode;
  aside: ReactNode;
  primaryScrollable?: boolean;
  asideScrollable?: boolean;
  primaryClassName?: string;
  asideClassName?: string;
  bodyClassName?: string;
}

export function SplitDialog({
  aside,
  asideClassName,
  asideScrollable,
  bodyClassName,
  primary,
  primaryClassName,
  primaryScrollable,
  ...dialogProps
}: SplitDialogProps) {
  return (
    <Dialog
      {...dialogProps}
      bodyClassName={cn('dgf:flex dgf:min-h-0 dgf:flex-1 dgf:flex-col dgf:p-0', bodyClassName)}
    >
      <SplitLayout
        primary={primary}
        aside={aside}
        primaryScrollable={primaryScrollable}
        asideScrollable={asideScrollable}
        primaryClassName={primaryClassName}
        asideClassName={asideClassName}
      />
    </Dialog>
  );
}
