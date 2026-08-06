import {
  useEffect,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { ImageOff } from 'lucide-react';

import { cn } from '../internal/cn';

export interface ImageWithFallbackProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
  src: string | null | undefined;
  alt: string;
  fallback?: ReactNode;
  wrapperClassName?: string;
  fallbackClassName?: string;
}

export function ImageWithFallback({
  alt,
  className,
  decoding = 'async',
  fallback,
  fallbackClassName,
  loading = 'lazy',
  onError,
  src,
  wrapperClassName,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setFailed(true);
    onError?.(event);
  };

  return (
    <span
      data-slot="image-with-fallback"
      className={cn('dgf-root dgf:relative dgf:block dgf:h-full dgf:w-full dgf:overflow-hidden', wrapperClassName)}
    >
      {src && !failed ? (
        <img
          {...props}
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onError={handleError}
          className={cn('dgf:h-full dgf:w-full dgf:object-cover', className)}
        />
      ) : (
        fallback ?? (
          <span
            role="img"
            aria-label={alt}
            className={cn(
              'dgf:flex dgf:h-full dgf:w-full dgf:items-center dgf:justify-center dgf:bg-[var(--dgf-color-muted)] dgf:text-[var(--dgf-color-text-muted)]',
              fallbackClassName,
            )}
          >
            <ImageOff aria-hidden="true" className="dgf:size-6" />
          </span>
        )
      )}
    </span>
  );
}
