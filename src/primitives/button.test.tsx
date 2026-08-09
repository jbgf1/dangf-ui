import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
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
