import type { ReactNode } from 'react';

import { Dialog } from '../overlays/dialog';

export interface ImagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
  title?: ReactNode;
}

export function ImagePreviewDialog({
  alt,
  onOpenChange,
  open,
  src,
  title = 'Image preview',
}: ImagePreviewDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      size="full"
      bodyClassName="dgf:flex dgf:items-center dgf:justify-center dgf:bg-black/5 dgf:p-2"
    >
      <img
        src={src}
        alt={alt}
        className="dgf:max-h-[78dvh] dgf:max-w-full dgf:object-contain"
      />
    </Dialog>
  );
}
