import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './select';

describe('Select', () => {
  it('renders an inset decorative chevron', () => {
    const { container } = render(
      <Select aria-label="Scope" defaultValue="future">
        <option value="future">This and future</option>
      </Select>,
    );

    const icon = container.querySelector('[data-slot="select-icon"]');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveClass('dgf:right-4');
    expect(icon?.querySelector('svg')).toBeInTheDocument();
  });

  it('emits native and value change callbacks', () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <Select
        aria-label="Scope"
        defaultValue="future"
        onChange={onChange}
        onValueChange={onValueChange}
      >
        <option value="future">This and future</option>
        <option value="all">Entire schedule</option>
      </Select>,
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'all' },
    });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onValueChange).toHaveBeenCalledWith('all');
  });

  it('forwards the select ref and custom classes', () => {
    const ref = createRef<HTMLSelectElement>();
    const { container } = render(
      <Select
        ref={ref}
        aria-label="Status"
        className="consumer-select"
        containerClassName="consumer-container"
      >
        <option>Active</option>
      </Select>,
    );

    expect(ref.current).toBe(screen.getByRole('combobox'));
    expect(ref.current).toHaveClass('consumer-select');
    expect(container.querySelector('[data-slot="select-root"]')).toHaveClass(
      'consumer-container',
    );
  });

  it('omits the chevron for a multiple select', () => {
    const { container } = render(
      <Select aria-label="Tags" multiple>
        <option>Planning</option>
      </Select>,
    );

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('listbox')).toHaveClass('dgf:h-auto');
    expect(container.querySelector('[data-slot="select-icon"]')).toBeNull();
  });

  it('allows the decorative icon to be removed', () => {
    const { container } = render(
      <Select aria-label="Status" icon={null}>
        <option>Active</option>
      </Select>,
    );

    expect(screen.getByRole('combobox')).not.toHaveClass('dgf:pr-11');
    expect(container.querySelector('[data-slot="select-icon"]')).toBeNull();
  });
});
