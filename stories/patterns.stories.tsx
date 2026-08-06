import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDays, Lightbulb, Plus } from 'lucide-react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button, Card } from '../src';
import {
  Breadcrumb,
  Coachmark,
  EmptyState,
  LoadingOverlay,
  Pagination,
  PropertyRow,
  SearchInput,
  SplitDialog,
  SplitLayout,
} from '../src/patterns';

const meta = {
  title: 'Patterns/Product',
  component: EmptyState,
  args: {
    title: 'Empty state',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => (
    <EmptyState
      title="No goals yet"
      description="Create a goal to turn an intention into a concrete next step."
      action={<Button><Plus /> Create goal</Button>}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <Card className="dgf:relative dgf:h-52 dgf:max-w-xl dgf:p-6">
      <h3 className="dgf:font-semibold">Goal timeline</h3>
      <p className="dgf:mt-2">Existing content remains in place while loading.</p>
      <LoadingOverlay active label="Refreshing timeline" />
    </Card>
  ),
};

export const BreadcrumbNavigation: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { id: 'home', label: 'Goals', href: '#' },
        { id: 'project', label: 'Launch', href: '#' },
        { id: 'task', label: 'Prepare release', current: true },
      ]}
    />
  ),
};

function SearchExample() {
  const [value, setValue] = useState('weekly');
  return <SearchInput value={value} onValueChange={setValue} aria-label="Search goals" />;
}

export const Search: Story = {
  render: () => <div className="dgf:max-w-md"><SearchExample /></div>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Clear search' }));
    await expect(canvas.getByRole('searchbox')).toHaveValue('');
  },
};

function PaginationExample() {
  const [page, setPage] = useState(3);
  return (
    <Pagination
      page={page}
      totalPages={8}
      totalItems={153}
      pageSize={20}
      onPageChange={setPage}
      onRefresh={() => undefined}
    />
  );
}

export const PageNavigation: Story = {
  render: () => <PaginationExample />,
};

export const Guidance: Story = {
  render: () => (
    <Coachmark
      icon={<Lightbulb />}
      title="Keep the next step small"
      description="A concrete action is easier to start than a broad intention."
      onDismiss={() => undefined}
      action={<Button size="sm" variant="outline">Show example</Button>}
    />
  ),
};

export const PropertyList: Story = {
  render: () => (
    <Card className="dgf:max-w-lg dgf:p-2">
      <PropertyRow icon={<CalendarDays />} label="Due date" value="Friday, 5:00 PM" />
      <PropertyRow label="Owner" value="You" expanded />
      <PropertyRow label="Status" value="In progress" interactive={false} />
    </Card>
  ),
};

export const ResponsiveSplitLayout: Story = {
  render: () => (
    <Card className="dgf:flex dgf:min-h-[24rem] dgf:overflow-hidden">
      <SplitLayout
        primary={<div><h3 className="dgf:font-semibold">Plan</h3><p className="dgf:mt-2">Primary editing surface.</p></div>}
        aside={<div><h3 className="dgf:font-semibold">Properties</h3><p className="dgf:mt-2">Supporting context.</p></div>}
      />
    </Card>
  ),
  parameters: { viewport: { defaultViewport: 'responsive' } },
};

function SplitDialogExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open split dialog</Button>
      <SplitDialog
        open={open}
        onOpenChange={setOpen}
        title="Review goal"
        size="xl"
        primary={<div><h3>Main details</h3><p>Edit the outcome and next step here.</p></div>}
        aside={<div><h3>Metadata</h3><p>Review dates and ownership here.</p></div>}
      />
    </>
  );
}

export const DialogWithSplitContent: Story = {
  render: () => <SplitDialogExample />,
};
