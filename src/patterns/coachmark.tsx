import { X } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../internal/cn';
import { Button } from '../primitives/button';
import { Card } from '../primitives/card';

export interface CoachmarkProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function Coachmark({
  action,
  className,
  description,
  dismissLabel = 'Dismiss',
  icon,
  onDismiss,
  title,
  ...props
}: CoachmarkProps) {
  return (
    <Card
      data-slot="coachmark"
      role="note"
      className={cn(
        'dgf-root dgf:relative dgf:flex dgf:items-start dgf:gap-3 dgf:p-4 dgf:shadow-[var(--dgf-shadow-md)]',
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="dgf:flex dgf:size-9 dgf:shrink-0 dgf:items-center dgf:justify-center dgf:rounded-full dgf:bg-[var(--dgf-color-muted)] dgf:[&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      <div className="dgf:min-w-0 dgf:flex-1">
        <p className="dgf:font-semibold">{title}</p>
        <div className="dgf:mt-1 dgf:text-sm dgf:leading-6 dgf:text-[var(--dgf-color-text-muted)]">
          {description}
        </div>
        {action ? <div className="dgf:mt-3">{action}</div> : null}
      </div>
      {onDismiss ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <X />
        </Button>
      ) : null}
    </Card>
  );
}
