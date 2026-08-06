import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuLabel,
  ActionMenuSeparator,
  Button,
  ConfirmDialog,
  Dialog,
  Drawer,
  ResponsivePopover,
} from '../src';

const meta = {
  title: 'Components/Overlays',
  component: Dialog,
  args: {
    open: false,
    onOpenChange: fn(),
    children: null,
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Edit goal"
        description="Update the next concrete step."
        footer={<Button onClick={() => setOpen(false)}>Save changes</Button>}
      >
        Keep the content focused and concise.
      </Dialog>
    </>
  );
}

export const DialogDefault: Story = {
  render: () => <DialogExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    await expect(
      await within(document.body).findByRole('dialog', { name: 'Edit goal' }),
    ).toHaveAttribute('data-state', 'open');
  },
};

export const DialogLoading: Story = {
  render: () => (
    <Dialog
      open
      onOpenChange={fn()}
      title="Publishing changes"
      loading
      loadingLabel="Publishing"
    >
      The dialog cannot be dismissed while the request is pending.
    </Dialog>
  ),
};

function ConfirmExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Delete goal</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this goal?"
        description="This action cannot be undone."
        onConfirm={async () => Promise.resolve()}
      />
    </>
  );
}

export const Confirmation: Story = {
  render: () => <ConfirmExample />,
};

function DrawerExample({ side = 'right' }: { side?: 'bottom' | 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {side} drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Goal inspector"
        description="Review properties without leaving the page."
        side={side}
        footer={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        Drawer content supports nested scrolling and focus trapping.
      </Drawer>
    </>
  );
}

export const SideDrawer: Story = {
  render: () => <DrawerExample />,
};

export const MobileBottomDrawer: Story = {
  render: () => <DrawerExample side="bottom" />,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

export const Menu: Story = {
  render: () => (
    <ActionMenu
      trigger={<Button variant="outline" size="icon" aria-label="Goal actions"><MoreHorizontal /></Button>}
    >
      <ActionMenuLabel>Goal</ActionMenuLabel>
      <ActionMenuItem icon={<Pencil />} onSelect={fn()}>Rename</ActionMenuItem>
      <ActionMenuItem disabled>Archive unavailable</ActionMenuItem>
      <ActionMenuSeparator />
      <ActionMenuItem icon={<Trash2 />} tone="danger" onSelect={fn()}>Delete</ActionMenuItem>
    </ActionMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Goal actions' }));
    const menu = await within(document.body).findByRole('menu');
    await userEvent.keyboard('{ArrowDown}');
    await expect(within(menu).getByText('Rename').closest('[role="menuitem"]')).toHaveFocus();
  },
};

export const DesktopResponsivePopover: Story = {
  render: () => (
    <ResponsivePopover
      trigger={<Button variant="outline">Edit schedule</Button>}
      mobileTitle="Schedule"
      content={
        <div className="dgf:grid dgf:gap-2">
          <strong>Repeat weekly</strong>
          <span>Choose the days that support this goal.</span>
        </div>
      }
    />
  ),
};

export const MobileResponsivePopover: Story = {
  render: () => (
    <ResponsivePopover
      trigger={<Button variant="outline">Edit schedule</Button>}
      mobileBreakpoint={10000}
      mobileTitle="Schedule"
      content={<p>The same content is recomposed into a bottom drawer.</p>}
    />
  ),
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
