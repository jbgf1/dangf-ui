import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('defers value changes until IME composition ends', () => {
    const onValueChange = vi.fn();
    const onCommit = vi.fn();
    render(
      <Input
        aria-label="Title"
        deferValueChangeDuringComposition
        onValueChange={onValueChange}
        onCommit={onCommit}
      />,
    );

    const input = screen.getByLabelText('Title');
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: '目' } });
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.compositionEnd(input, { data: '標' });
    expect(onValueChange).toHaveBeenLastCalledWith('目');
    expect(onCommit).toHaveBeenLastCalledWith('目', 'compositionEnd');
  });

  it('emits ordinary Latin input without composition deferral', () => {
    const onValueChange = vi.fn();
    render(<Input aria-label="Title" onValueChange={onValueChange} />);
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Launch plan' },
    });
    expect(onValueChange).toHaveBeenLastCalledWith('Launch plan');
  });

  it('commits the latest value on blur', () => {
    const onCommit = vi.fn();
    render(<Input aria-label="Name" defaultValue="Before" onCommit={onCommit} />);
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'After' } });
    fireEvent.blur(input);
    expect(onCommit).toHaveBeenCalledWith('After', 'blur');
  });

  it('synchronizes a changed default value while blurred', () => {
    const { rerender } = render(<Input aria-label="Name" defaultValue="First" />);
    const input = screen.getByLabelText<HTMLInputElement>('Name');
    expect(input).toHaveValue('First');
    rerender(<Input aria-label="Name" defaultValue="Second" />);
    expect(input).toHaveValue('Second');
  });

  it('follows controlled value updates from the consumer', () => {
    const { rerender } = render(<Input aria-label="Name" value="First" />);
    const input = screen.getByLabelText('Name');
    rerender(<Input aria-label="Name" value="Second" />);
    expect(input).toHaveValue('Second');
  });
});
