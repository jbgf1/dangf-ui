import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type ButtonHTMLAttributes,
} from 'react';

import { cn } from '../internal/cn';

const buttonVariants = cva(
  'dgf:inline-flex dgf:cursor-pointer dgf:items-center dgf:justify-center dgf:gap-2 dgf:whitespace-nowrap dgf:font-medium dgf:transition dgf:duration-150 dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:focus-visible:ring-offset-2 dgf:disabled:pointer-events-none dgf:disabled:opacity-50 dgf:[&_svg]:pointer-events-none dgf:[&_svg]:size-4 dgf:[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'dgf:bg-[var(--dgf-color-primary)] dgf:text-[var(--dgf-color-primary-foreground)] dgf:shadow-[var(--dgf-shadow-sm)] dgf:hover:brightness-95',
        secondary:
          'dgf:bg-[var(--dgf-color-panel)] dgf:text-[var(--dgf-color-text)] dgf:hover:brightness-95',
        outline:
          'dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:text-[var(--dgf-color-text)] dgf:hover:bg-[var(--dgf-color-muted)]',
        ghost:
          'dgf:bg-transparent dgf:text-[var(--dgf-color-text)] dgf:hover:bg-[var(--dgf-color-muted)]',
        danger:
          'dgf:bg-[var(--dgf-color-danger)] dgf:text-white dgf:hover:brightness-95',
        link:
          'dgf:bg-transparent dgf:text-[var(--dgf-color-primary)] dgf:underline-offset-4 dgf:hover:underline',
      },
      size: {
        sm: 'dgf:h-8 dgf:rounded-[var(--dgf-radius-sm)] dgf:px-3 dgf:text-xs',
        md: 'dgf:h-10 dgf:rounded-[var(--dgf-radius-md)] dgf:px-4 dgf:text-sm',
        lg: 'dgf:h-12 dgf:rounded-[var(--dgf-radius-md)] dgf:px-6 dgf:text-base',
        icon: 'dgf:size-10 dgf:rounded-[var(--dgf-radius-md)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ className, size, variant }))}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { buttonVariants };
