import {
  Image,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import { cn } from '../internal/cn';
import { Button } from '../primitives/button';
import { ImageWithFallback } from './image-with-fallback';

export interface ImageDropzoneLabels {
  upload: string;
  locked: string;
  replace: string;
  remove: string;
  uploading: string;
  invalidType: string;
  invalidImage: string;
  tooLarge: (maximum: string) => string;
  uploadFailed: string;
}

export interface ImageDropzoneProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onError'> {
  value: string | null;
  alt: string;
  onFileSelect: (file: File) => void | Promise<void>;
  onRemove?: () => void;
  locked?: boolean;
  onLockedClick?: () => void;
  uploading?: boolean;
  accept?: string;
  maxFileBytes?: number;
  validate?: (file: File) => string | null | Promise<string | null>;
  labels?: Partial<ImageDropzoneLabels>;
  requirements?: ReactNode;
  emptyState?: ReactNode;
  overlay?: ReactNode;
  aspectRatioClassName?: string;
  onErrorMessage?: (message: string | null) => void;
}

const defaultLabels: ImageDropzoneLabels = {
  upload: 'Drag an image here or click to upload',
  locked: 'Image upload is locked',
  replace: 'Replace image',
  remove: 'Remove image',
  uploading: 'Uploading image…',
  invalidType: 'Choose a supported image type.',
  invalidImage: 'This image could not be previewed.',
  tooLarge: (maximum) => `This image exceeds the ${maximum} limit.`,
  uploadFailed: 'Failed to upload image.',
};

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${Number((bytes / (1024 * 1024)).toFixed(1))} MB`;
  }
  if (bytes >= 1024) {
    return `${Number((bytes / 1024).toFixed(1))} KB`;
  }
  return `${bytes} B`;
}

function matchesAccept(file: File, accept: string): boolean {
  const candidates = accept.split(',').map((candidate) => candidate.trim()).filter(Boolean);
  return candidates.length === 0 || candidates.some((candidate) => {
    if (candidate.startsWith('.')) {
      return file.name.toLowerCase().endsWith(candidate.toLowerCase());
    }
    if (candidate.endsWith('/*')) {
      return file.type.startsWith(candidate.slice(0, -1));
    }
    return file.type === candidate;
  });
}

function previewImage(file: File, invalidMessage: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => resolve(url);
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(invalidMessage));
    };
    image.src = url;
  });
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message.trim() ? error.message : fallback;
}

export function ImageDropzone({
  accept = 'image/jpeg,image/png,image/webp',
  alt,
  aspectRatioClassName = 'dgf:aspect-[16/7]',
  className,
  emptyState,
  labels,
  locked = false,
  maxFileBytes,
  onErrorMessage,
  onFileSelect,
  onLockedClick,
  onRemove,
  overlay,
  requirements,
  uploading = false,
  validate,
  value,
  ...props
}: ImageDropzoneProps) {
  const copy = useMemo(() => ({ ...defaultLabels, ...labels }), [labels]);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const displayUrl = previewUrl ?? value;

  const updateMessage = useCallback(
    (nextMessage: string | null) => {
      setMessage(nextMessage);
      onErrorMessage?.(nextMessage);
    },
    [onErrorMessage],
  );

  useEffect(() => {
    if (value && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    updateMessage(null);
  }, [value]);

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl],
  );

  const selectFile = useCallback(
    async (file: File | null | undefined) => {
      if (!file) {
        return;
      }
      if (locked) {
        onLockedClick?.();
        return;
      }
      updateMessage(null);
      if (!matchesAccept(file, accept)) {
        updateMessage(copy.invalidType);
        return;
      }
      if (maxFileBytes !== undefined && file.size > maxFileBytes) {
        updateMessage(copy.tooLarge(formatBytes(maxFileBytes)));
        return;
      }
      const validationMessage = await validate?.(file);
      if (validationMessage) {
        updateMessage(validationMessage);
        return;
      }

      const previousPreview = previewUrl;
      let nextPreview: string;
      try {
        nextPreview = await previewImage(file, copy.invalidImage);
        setPreviewUrl(nextPreview);
      } catch (error) {
        updateMessage(errorMessage(error, copy.invalidImage));
        return;
      }

      try {
        await onFileSelect(file);
        if (previousPreview) {
          URL.revokeObjectURL(previousPreview);
        }
      } catch (error) {
        URL.revokeObjectURL(nextPreview);
        setPreviewUrl(previousPreview);
        updateMessage(errorMessage(error, copy.uploadFailed));
      }
    },
    [
      accept,
      copy,
      locked,
      maxFileBytes,
      onFileSelect,
      onLockedClick,
      previewUrl,
      updateMessage,
      validate,
    ],
  );

  const openPicker = () => {
    if (locked) {
      onLockedClick?.();
      return;
    }
    inputRef.current?.click();
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    void selectFile(event.currentTarget.files?.[0]);
    event.currentTarget.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    void selectFile(event.dataTransfer.files?.[0]);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker();
    }
  };

  return (
    <div
      data-slot="image-dropzone-wrap"
      className={cn('dgf-root dgf:relative', className)}
      {...props}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        aria-label={copy.upload}
        className="dgf:sr-only"
        onChange={handleInput}
      />
      <div
        data-slot="image-dropzone"
        role="button"
        tabIndex={0}
        aria-label={locked ? copy.locked : copy.upload}
        onClick={openPicker}
        onKeyDown={handleKeyboard}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        className={cn(
          'dgf:group dgf:relative dgf:flex dgf:w-full dgf:cursor-pointer dgf:overflow-hidden dgf:rounded-[var(--dgf-radius-xl)] dgf:border dgf:border-dashed dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-muted)]/40 dgf:text-left dgf:transition-colors dgf:hover:border-[var(--dgf-color-primary)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)]',
          aspectRatioClassName,
          dragActive && 'dgf:border-[var(--dgf-color-primary)] dgf:bg-[var(--dgf-color-muted)]',
        )}
      >
        {displayUrl ? (
          <>
            <ImageWithFallback
              src={displayUrl}
              alt={alt}
              wrapperClassName="dgf:absolute dgf:inset-0"
            />
            <span className="dgf:absolute dgf:inset-0 dgf:bg-gradient-to-b dgf:from-black/5 dgf:via-transparent dgf:to-black/45" />
          </>
        ) : null}
        {overlay ? <span className="dgf:absolute dgf:inset-0">{overlay}</span> : null}
        {!displayUrl ? (
          <div className="dgf:relative dgf:z-10 dgf:flex dgf:flex-1 dgf:flex-col dgf:items-center dgf:justify-center dgf:gap-3 dgf:p-6 dgf:text-center">
            {emptyState ?? (
              <>
                <span className="dgf:flex dgf:size-12 dgf:items-center dgf:justify-center dgf:rounded-full dgf:bg-[var(--dgf-color-surface)] dgf:text-[var(--dgf-color-primary)] dgf:shadow-[var(--dgf-shadow-sm)]">
                  <UploadCloud className="dgf:size-6" />
                </span>
                <span className="dgf:text-sm dgf:font-semibold">{copy.upload}</span>
              </>
            )}
            {requirements ? (
              <span className="dgf:text-xs dgf:text-[var(--dgf-color-text-muted)]">
                {requirements}
              </span>
            ) : null}
          </div>
        ) : null}
        {displayUrl ? (
          <div className="dgf:pointer-events-none dgf:absolute dgf:inset-x-0 dgf:bottom-0 dgf:z-10 dgf:flex dgf:items-center dgf:justify-end dgf:gap-2 dgf:p-4">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="dgf:pointer-events-auto"
              aria-label={copy.replace}
              onClick={(event) => {
                event.stopPropagation();
                openPicker();
              }}
            >
              <Image />
              {copy.replace}
            </Button>
            {onRemove ? (
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="dgf:pointer-events-auto"
                aria-label={copy.remove}
                onClick={(event) => {
                  event.stopPropagation();
                  if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setPreviewUrl(null);
                  updateMessage(null);
                  onRemove();
                }}
              >
                <Trash2 />
              </Button>
            ) : null}
          </div>
        ) : null}
        {uploading ? (
          <div className="dgf:absolute dgf:inset-0 dgf:z-20 dgf:flex dgf:items-center dgf:justify-center dgf:bg-[var(--dgf-color-surface)]/75 dgf:backdrop-blur-sm">
            <span className="dgf:rounded-full dgf:bg-[var(--dgf-color-surface)] dgf:px-4 dgf:py-2 dgf:text-sm dgf:font-medium dgf:shadow-[var(--dgf-shadow-sm)]">
              {copy.uploading}
            </span>
          </div>
        ) : null}
        {message ? (
          <div
            role="alert"
            className="dgf:absolute dgf:inset-x-3 dgf:top-3 dgf:z-30 dgf:rounded-[var(--dgf-radius-md)] dgf:border dgf:border-[var(--dgf-color-danger)]/25 dgf:bg-[var(--dgf-color-danger-surface)] dgf:px-3 dgf:py-2 dgf:text-xs dgf:font-medium dgf:text-[var(--dgf-color-danger)]"
          >
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
