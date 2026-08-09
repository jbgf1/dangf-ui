import {
  forwardRef,
  type ButtonHTMLAttributes,
} from 'react';

import { cn } from '../internal/cn';
import {
  getResponsiveBaseValue,
  isResponsiveValueMap,
  resolveResponsiveClassNames,
  type ResponsiveValue,
} from '../responsive';
import {
  keycapBaseSizeClassNames,
  keycapBaseVariants,
  keycapButtonResponsiveSizeClassNames,
  keycapButtonVariants,
  keycapContentSizeClassNames,
  keycapContentVariants,
  keycapFaceSizeClassNames,
  keycapFaceVariants,
  type KeycapButtonSize,
  type KeycapButtonVariantProps,
} from './keycap-button.styles';

export interface KeycapButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<KeycapButtonVariantProps, 'size'> {
  size?: ResponsiveValue<KeycapButtonSize> | null | undefined;
}

export const KeycapButton = forwardRef<HTMLButtonElement, KeycapButtonProps>(
  ({ children, className, shape, size, tone, type = 'button', ...props }, ref) => {
    const baseSize = getResponsiveBaseValue(size, 'md');
    const hasResponsiveSize = isResponsiveValueMap(size);
    const usesVisualBase = hasResponsiveSize || baseSize === 'icon-compact';

    return (
      <button
        ref={ref}
        type={type}
        data-slot="keycap-button"
        className={cn(
          keycapButtonVariants({ className, shape, size: baseSize, tone }),
          hasResponsiveSize && 'dgf:bg-transparent! dgf:shadow-none!',
          resolveResponsiveClassNames(
            size,
            keycapButtonResponsiveSizeClassNames,
          ),
        )}
        {...props}
      >
        {usesVisualBase && (
          <span
            aria-hidden="true"
            data-slot="keycap-button-base"
            className={cn(
              keycapBaseVariants({ shape, size: baseSize, tone }),
              resolveResponsiveClassNames(size, keycapBaseSizeClassNames),
            )}
          />
        )}
        <span
          aria-hidden="true"
          data-slot="keycap-button-face"
          className={cn(
            keycapFaceVariants({ shape, size: baseSize, tone }),
            resolveResponsiveClassNames(size, keycapFaceSizeClassNames),
          )}
        />
        <span
          data-slot="keycap-button-content"
          className={cn(
            keycapContentVariants({ size: baseSize }),
            resolveResponsiveClassNames(size, keycapContentSizeClassNames),
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

KeycapButton.displayName = 'KeycapButton';

export { keycapButtonVariants };
export type { KeycapButtonSize };
