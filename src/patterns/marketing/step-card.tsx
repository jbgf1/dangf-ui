import type { ReactNode } from 'react';

import { GlowCard } from './glow-card';

export interface StepCardProps {
  step: ReactNode;
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function StepCard({
  className,
  description,
  icon,
  step,
  title,
}: StepCardProps) {
  return (
    <GlowCard
      data-slot="step-card"
      align="center"
      tone="translucent"
      interactive
      className={className}
    >
      <div className="dgf:mx-auto dgf:mb-4 dgf:flex dgf:size-14 dgf:items-center dgf:justify-center dgf:rounded-full dgf:bg-[var(--dgf-color-primary)] dgf:font-semibold dgf:text-[var(--dgf-color-primary-foreground)] dgf:shadow-[var(--dgf-shadow-md)] dgf:[&_svg]:size-6">
        {icon ?? step}
      </div>
      <div className="dgf:text-xs dgf:font-semibold dgf:uppercase dgf:tracking-wider dgf:text-[var(--dgf-color-primary)]">
        Step {step}
      </div>
      <h3 className="dgf:mt-2 dgf:text-lg dgf:font-semibold">{title}</h3>
      <div className="dgf:mt-2 dgf:text-sm dgf:leading-6 dgf:text-[var(--dgf-color-text-muted)]">
        {description}
      </div>
    </GlowCard>
  );
}
