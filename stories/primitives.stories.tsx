import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckCircle2, Info } from 'lucide-react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  FieldTip,
  Input,
  KeycapButton,
  Progress,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tag,
  Textarea,
  Tooltip,
} from '../src';

const meta = {
  title: 'Components/Primitives',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  render: () => (
    <div className="dgf:flex dgf:flex-wrap dgf:gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
      <Button size={{ base: 'sm', md: 'lg' }}>Responsive size</Button>
      <Button disabled>Disabled</Button>
      <Button disabled><Spinner label="Saving" /> Saving</Button>
    </div>
  ),
};

export const KeycapButtons: Story = {
  render: () => (
    <div className="dgf:flex dgf:items-center dgf:gap-5">
      <KeycapButton>Run</KeycapButton>
      <KeycapButton size="sm">Save</KeycapButton>
      <KeycapButton aria-label="Favorite" shape="circle" size="icon">
        <CheckCircle2 />
      </KeycapButton>
      <KeycapButton aria-label="Favorited" aria-pressed shape="circle" size="icon" tone="accent">
        <CheckCircle2 />
      </KeycapButton>
      <KeycapButton aria-label="Favorited" aria-pressed shape="circle" size="icon-compact" tone="neutral">
        <CheckCircle2 />
      </KeycapButton>
      <KeycapButton
        aria-label="Responsive favorite"
        shape="circle"
        size={{ base: 'icon-compact', sm: 'icon' }}
      >
        <CheckCircle2 />
      </KeycapButton>
      <KeycapButton disabled>Disabled</KeycapButton>
    </div>
  ),
};

export const CardComposition: Story = {
  render: () => (
    <Card className="dgf:max-w-md">
      <CardHeader>
        <CardTitle>Weekly review</CardTitle>
        <CardDescription>Keep the next step visible.</CardDescription>
      </CardHeader>
      <CardContent>Three goals are ready for review.</CardContent>
      <CardFooter><Button size="sm">Review now</Button></CardFooter>
    </Card>
  ),
};

export const BadgesAndTags: Story = {
  render: () => (
    <div className="dgf:flex dgf:flex-wrap dgf:gap-3">
      <Badge>Neutral</Badge>
      <Badge tone="primary">Active</Badge>
      <Badge tone="warning">Needs attention</Badge>
      <Badge tone="danger">Blocked</Badge>
      <Tag icon={<CheckCircle2 />} tone="success">Complete</Tag>
      <Tag icon={<Info />} tone="info">Tip</Tag>
    </div>
  ),
};

function InputExample() {
  const [value, setValue] = useState('Draft goal');
  const [scope, setScope] = useState('future');
  return (
    <div className="dgf:grid dgf:max-w-md dgf:gap-3">
      <label htmlFor="title">Title</label>
      <Input id="title" value={value} onValueChange={setValue} />
      <Textarea aria-label="Notes" placeholder="Add notes" />
      <label htmlFor="scope">Change scope</label>
      <Select id="scope" value={scope} onValueChange={setScope}>
        <option value="future">This and future</option>
        <option value="all">Entire schedule</option>
      </Select>
      <FieldTip tone="danger">A title is required before publishing.</FieldTip>
    </div>
  );
}

export const FormFields: Story = {
  render: () => <InputExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Title');
    await userEvent.clear(input);
    await userEvent.type(input, 'Plan launch');
    await expect(input).toHaveValue('Plan launch');
    await userEvent.selectOptions(canvas.getByLabelText('Change scope'), 'all');
    await expect(canvas.getByLabelText('Change scope')).toHaveValue('all');
  },
};

function SelectionExample() {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="dgf:grid dgf:max-w-lg dgf:gap-5">
      <Checkbox checked={checked} onCheckedChange={(next) => setChecked(next === true)} label="Include weekends" />
      <Switch checked={enabled} onCheckedChange={setEnabled} label="Enable reminders" />
      <Slider defaultValue={[45]} thumbLabel="Completion" />
    </div>
  );
}

export const SelectionControls: Story = {
  render: () => <SelectionExample />,
};

export const ProgressAndLoading: Story = {
  render: () => (
    <div className="dgf:grid dgf:max-w-lg dgf:gap-5">
      <Progress value={68} showValue />
      <div className="dgf:flex dgf:items-center dgf:gap-3"><Spinner /> Loading goals</div>
      <Skeleton className="dgf:h-20 dgf:w-full" aria-label="Loading card" />
    </div>
  ),
};

export const TooltipAndFieldTip: Story = {
  render: () => (
    <div className="dgf:grid dgf:w-fit dgf:gap-4">
      <Tooltip content="Keyboard shortcuts are available" delayDuration={0}>
        <Button variant="outline">Show guidance</Button>
      </Tooltip>
      <FieldTip tone="info">Changes are saved automatically.</FieldTip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole('button', { name: 'Show guidance' }));
    await expect(await within(document.body).findByRole('tooltip')).toBeVisible();
  },
};

export const WarmTheme: Story = {
  globals: { theme: 'warm' },
  render: () => (
    <Card className="dgf:max-w-sm dgf:p-6">
      <Badge tone="primary">Warm preset</Badge>
      <p className="dgf:mt-3">The preset only changes namespaced design tokens.</p>
    </Card>
  ),
};
