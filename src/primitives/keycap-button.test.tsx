import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { KeycapButton } from './keycap-button';

describe('KeycapButton', () => {
  it('renders a layered keycap and forwards button behavior', () => {
    const onClick = vi.fn();
    render(<KeycapButton onClick={onClick}>Run</KeycapButton>);

    const button = screen.getByRole('button', { name: 'Run' });
    expect(button).toHaveAttribute('data-slot', 'keycap-button');
    expect(button.querySelector('[data-slot="keycap-button-face"]')).toBeInTheDocument();
    expect(button.querySelector('[data-slot="keycap-button-content"]')).toHaveTextContent('Run');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('supports icon-only circular controls and native pressed state', () => {
    render(
      <KeycapButton aria-label="Save" aria-pressed shape="circle" size="icon" tone="accent">
        <svg aria-hidden="true" />
      </KeycapButton>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveClass('dgf:rounded-full');
    expect(button).toHaveClass('dgf:bg-[var(--dgf-color-accent)]');
  });

  it('keeps a full touch target while rendering a compact icon keycap', () => {
    render(
      <KeycapButton aria-label="Save" shape="circle" size="icon-compact">
        <svg aria-hidden="true" />
      </KeycapButton>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    const base = button.querySelector('[data-slot="keycap-button-base"]');
    const face = button.querySelector('[data-slot="keycap-button-face"]');
    const content = button.querySelector('[data-slot="keycap-button-content"]');

    expect(button).toHaveClass('dgf:size-11');
    expect(base).toHaveClass('dgf:inset-0.5');
    expect(face).toHaveClass('dgf:inset-x-0.5');
    expect(content).toHaveClass('dgf:[&_svg]:size-[18px]');
  });
});
