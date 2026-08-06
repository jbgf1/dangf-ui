import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '../src';
import {
  ImageDropzone,
  ImagePreviewDialog,
  ImageWithFallback,
  VideoWithPoster,
} from '../src/media';

const imageUrl =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="960" height="420" viewBox="0 0 960 420"%3E%3Crect width="960" height="420" fill="%23e5ebe8"/%3E%3Ccircle cx="480" cy="165" r="72" fill="%23527662"/%3E%3Cpath d="M240 350L400 225l105 75 95-80 125 130z" fill="%238ba496"/%3E%3C/svg%3E';

const meta = {
  title: 'Media/Components',
  component: ImageWithFallback,
  args: {
    src: null,
    alt: 'Image',
  },
} satisfies Meta<typeof ImageWithFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
  render: () => (
    <div className="dgf:h-64 dgf:max-w-2xl dgf:overflow-hidden dgf:rounded-[var(--dgf-radius-lg)]">
      <ImageWithFallback src={imageUrl} alt="Abstract green landscape" />
    </div>
  ),
};

export const BrokenImageFallback: Story = {
  render: () => (
    <div className="dgf:h-64 dgf:max-w-2xl dgf:overflow-hidden dgf:rounded-[var(--dgf-radius-lg)]">
      <ImageWithFallback src={null} alt="Unavailable cover" />
    </div>
  ),
};

function PreviewExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Preview image</Button>
      <ImagePreviewDialog
        open={open}
        onOpenChange={setOpen}
        src={imageUrl}
        alt="Abstract green landscape"
      />
    </>
  );
}

export const ImagePreview: Story = {
  render: () => <PreviewExample />,
};

export const EmptyDropzone: Story = {
  render: () => (
    <div className="dgf:max-w-2xl">
      <ImageDropzone
        value={null}
        alt="Goal cover"
        requirements="PNG, JPEG or WebP up to 5 MB"
        maxFileBytes={5 * 1024 * 1024}
        onFileSelect={async () => Promise.resolve()}
      />
    </div>
  ),
};

export const UploadingDropzone: Story = {
  render: () => (
    <div className="dgf:max-w-2xl">
      <ImageDropzone
        value={imageUrl}
        alt="Goal cover"
        uploading
        onFileSelect={async () => Promise.resolve()}
        onRemove={() => undefined}
      />
    </div>
  ),
};

export const DropzoneValidationError: Story = {
  render: () => (
    <div className="dgf:max-w-2xl">
      <ImageDropzone
        value={null}
        alt="Goal cover"
        validate={() => 'The image must be at least 1200 pixels wide.'}
        onFileSelect={async () => Promise.resolve()}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fileInput = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    await expect(fileInput).not.toBeNull();
    if (!fileInput) {
      throw new Error('ImageDropzone file input was not rendered.');
    }
    await userEvent.upload(fileInput, new File(['image'], 'cover.png', { type: 'image/png' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('at least 1200 pixels');
  },
};

export const VideoPoster: Story = {
  render: () => (
    <div className="dgf:max-w-2xl">
      <VideoWithPoster
        src="data:video/mp4;base64,"
        poster={imageUrl}
        aria-label="Goal introduction"
      />
    </div>
  ),
};
