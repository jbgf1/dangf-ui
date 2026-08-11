import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders a text variant without surface chrome', () => {
    render(<Button variant="text">Discard changes</Button>);

    const button = screen.getByRole('button', { name: 'Discard changes' });
    expect(button).toHaveClass('dgf:border-0');
    expect(button).toHaveClass('dgf:bg-transparent');
    expect(button).toHaveClass('dgf:shadow-none');
    expect(button).toHaveClass('dgf:hover:bg-transparent');
    expect(button).toHaveClass('dgf:hover:text-[var(--dgf-color-text)]');
  });

  it('keeps scalar size props backward compatible', () => {
    render(<Button size="sm">Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('dgf:h-8');
    expect(button).not.toHaveClass('dgf:sm:h-10');
  });

  it('accepts mobile-first responsive size values', () => {
    render(
      <Button size={{ base: 'sm', sm: 'md', lg: 'lg' }}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('dgf:h-8');
    expect(button).toHaveClass('dgf:sm:h-10');
    expect(button).toHaveClass('dgf:lg:h-12');
  });
});
