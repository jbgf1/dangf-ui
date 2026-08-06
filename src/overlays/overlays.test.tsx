import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../primitives/button';
import {
  ActionMenu,
  ActionMenuItem,
} from './action-menu';
import { Dialog } from './dialog';
import { Drawer } from './drawer';
import { ResponsivePopover } from './responsive-popover';

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} title="Preferences">
        Dialog body
      </Dialog>
    </>
  );
}

function NestedDialogHarness() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOuterOpen(true)}>Open outer</Button>
      <Dialog open={outerOpen} onOpenChange={setOuterOpen} title="Outer dialog">
        <Button onClick={() => setInnerOpen(true)}>Open inner</Button>
        <Dialog open={innerOpen} onOpenChange={setInnerOpen} title="Inner dialog">
          Nested content
        </Dialog>
      </Dialog>
    </>
  );
}

describe('overlay modules', () => {
  it('returns focus after closing a dialog with Escape', async () => {
    const user = userEvent.setup();
    render(<DialogHarness />);
    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    await user.click(trigger);
    expect(await screen.findByRole('dialog', { name: 'Preferences' })).toBeVisible();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it('keeps keyboard focus inside an open dialog', async () => {
    const user = userEvent.setup();
    render(
      <Dialog open onOpenChange={() => undefined} title="Focus test">
        <Button>First action</Button>
        <Button>Last action</Button>
      </Dialog>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Focus test' });
    for (let index = 0; index < 5; index += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it('honors the overlay dismissal policy', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog
        open
        onOpenChange={onOpenChange}
        title="Protected dialog"
        closeOnOverlayClick={false}
      >
        Dialog body
      </Dialog>,
    );
    const overlay = document.querySelector<HTMLElement>('.dgf-dialog-overlay');
    expect(overlay).not.toBeNull();
    fireEvent.pointerDown(overlay!);
    fireEvent.click(overlay!);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('balances scroll locks across nested dialogs', async () => {
    const user = userEvent.setup();
    render(<NestedDialogHarness />);
    await user.click(screen.getByRole('button', { name: 'Open outer' }));
    await waitFor(() => expect(document.body).toHaveAttribute('data-scroll-locked', '1'));
    await user.click(screen.getByRole('button', { name: 'Open inner' }));
    await waitFor(() => expect(document.body).toHaveAttribute('data-scroll-locked', '2'));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(document.body).toHaveAttribute('data-scroll-locked', '1'));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(document.body).not.toHaveAttribute('data-scroll-locked'));
  });

  it('renders a side-aware drawer and closes it with Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} title="Inspector" side="right">
        Drawer body
      </Drawer>,
    );
    expect(screen.getByRole('dialog', { name: 'Inspector' })).toHaveAttribute(
      'data-side',
      'right',
    );
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('keeps a loading dialog open and disables its close control', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog
        open
        onOpenChange={onOpenChange}
        title="Saving"
        loading
        loadingLabel="Saving changes"
      >
        Dialog body
      </Dialog>,
    );
    expect(screen.getByRole('dialog', { name: 'Saving' })).toHaveAttribute(
      'aria-busy',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeDisabled();
    await user.keyboard('{Escape}');
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('supports keyboard selection in ActionMenu', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ActionMenu trigger={<Button>Actions</Button>}>
        <ActionMenuItem onSelect={onSelect}>Rename</ActionMenuItem>
      </ActionMenu>,
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(onSelect).toHaveBeenCalledOnce());
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('locks ActionMenu while an async selection is pending', async () => {
    let finishSelection: (() => void) | undefined;
    const selection = new Promise<void>((resolve) => {
      finishSelection = resolve;
    });
    const user = userEvent.setup();
    render(
      <ActionMenu trigger={<Button>Async actions</Button>}>
        <ActionMenuItem onSelect={() => selection}>Run action</ActionMenuItem>
      </ActionMenu>,
    );
    await user.click(screen.getByRole('button', { name: 'Async actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Run action' }));
    expect(screen.getByRole('menu')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('menuitem', { name: 'Run action' })).toHaveAttribute(
      'data-disabled',
    );
    finishSelection?.();
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('recomposes ResponsivePopover into a drawer on small screens', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query): MediaQueryList => ({
        matches: query.includes('max-width'),
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    );
    const user = userEvent.setup();
    render(
      <ResponsivePopover
        trigger={<Button>Schedule</Button>}
        content={<p>Popover body</p>}
        mobileTitle="Schedule options"
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Schedule' }));
    expect(
      await screen.findByRole('dialog', { name: 'Schedule options' }),
    ).toHaveTextContent('Popover body');
  });
});
