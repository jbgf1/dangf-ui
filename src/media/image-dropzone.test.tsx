import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ImageDropzone } from './image-dropzone';
import { ImageWithFallback } from './image-with-fallback';

class SuccessfulImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  set src(_value: string) {
    queueMicrotask(() => this.onload?.());
  }
}

describe('ImageDropzone', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', SuccessfulImage);
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(() => 'blob:preview'),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('rejects files over the configured limit', async () => {
    const onFileSelect = vi.fn();
    const { container } = render(
      <ImageDropzone
        value={null}
        alt="Cover"
        maxFileBytes={5}
        onFileSelect={onFileSelect}
      />,
    );
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(input).not.toBeNull();
    const file = new File(['too large'], 'cover.png', { type: 'image/png' });
    fireEvent.change(input!, { target: { files: [file] } });
    expect(await screen.findByRole('alert')).toHaveTextContent('5 B');
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  it('rejects files outside the accepted image types', async () => {
    const onFileSelect = vi.fn();
    const { container } = render(
      <ImageDropzone value={null} alt="Cover" onFileSelect={onFileSelect} />,
    );
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    fireEvent.change(input!, {
      target: { files: [new File(['notes'], 'notes.txt', { type: 'text/plain' })] },
    });
    expect(await screen.findByRole('alert')).toHaveTextContent('supported image type');
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  it('shows a preview and rolls it back when upload rejects', async () => {
    const onFileSelect = vi.fn().mockRejectedValue(new Error('Upload unavailable'));
    const { container } = render(
      <ImageDropzone value={null} alt="Cover" onFileSelect={onFileSelect} />,
    );
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    const file = new File(['image'], 'cover.png', { type: 'image/png' });
    fireEvent.change(input!, { target: { files: [file] } });
    expect(await screen.findByRole('alert')).toHaveTextContent('Upload unavailable');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:preview');
  });

  it('releases a successful preview object URL on unmount', async () => {
    const { container, unmount } = render(
      <ImageDropzone
        value={null}
        alt="Cover"
        onFileSelect={async () => Promise.resolve()}
      />,
    );
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    fireEvent.change(input!, {
      target: { files: [new File(['image'], 'cover.png', { type: 'image/png' })] },
    });
    expect(await screen.findByRole('img', { name: 'Cover' })).toHaveAttribute(
      'src',
      'blob:preview',
    );
    unmount();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:preview');
  });

  it('calls the locked action instead of opening the picker', async () => {
    const user = userEvent.setup();
    const onLockedClick = vi.fn();
    render(
      <ImageDropzone
        value={null}
        alt="Cover"
        locked
        onLockedClick={onLockedClick}
        onFileSelect={vi.fn()}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Image upload is locked' }));
    expect(onLockedClick).toHaveBeenCalledOnce();
  });
});

describe('ImageWithFallback', () => {
  it('renders a fallback after an image error', () => {
    render(<ImageWithFallback src="/broken.png" alt="Broken cover" />);
    fireEvent.error(screen.getByRole('img', { name: 'Broken cover' }));
    expect(screen.getByRole('img', { name: 'Broken cover' })).not.toHaveAttribute(
      'src',
      '/broken.png',
    );
  });
});
