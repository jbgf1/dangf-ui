import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flag, Route, Sparkles } from 'lucide-react';

import {
  CornerBadge,
  GlowCard,
  Section,
  SectionHeading,
  StepCard,
} from '../src/patterns/marketing';

const meta = {
  title: 'Patterns/Marketing',
  component: Section,
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SectionLayout: Story = {
  render: () => (
    <Section tone="panel" spacing="relaxed">
      <SectionHeading
        eyebrow="danGF UI"
        description="Calm building blocks for focused product experiences."
      >
        Make the next step obvious
      </SectionHeading>
    </Section>
  ),
};

export const Heading: Story = {
  render: () => (
    <SectionHeading
      align="center"
      size="lg"
      eyebrow="Designed for momentum"
      description="A neutral base theme keeps the component library at home in different products."
    >
      From intention to action
    </SectionHeading>
  ),
};

export const GlowCards: Story = {
  render: () => (
    <div className="dgf:grid dgf:max-w-4xl dgf:gap-5 dgf:md:grid-cols-3">
      <GlowCard><Sparkles /><h3 className="dgf:mt-4 dgf:font-semibold">Surface</h3></GlowCard>
      <GlowCard tone="translucent"><Route /><h3 className="dgf:mt-4 dgf:font-semibold">Translucent</h3></GlowCard>
      <GlowCard tone="accent" interactive><Flag /><h3 className="dgf:mt-4 dgf:font-semibold">Accent</h3></GlowCard>
    </div>
  ),
};

export const Steps: Story = {
  render: () => (
    <div className="dgf:grid dgf:max-w-4xl dgf:gap-5 dgf:md:grid-cols-3">
      <StepCard step="1" title="Name the outcome" description="Describe what done looks like." />
      <StepCard step="2" title="Choose a next step" description="Make it concrete and startable." />
      <StepCard step="3" title="Review progress" description="Adjust the plan with new information." />
    </div>
  ),
};

export const CornerLabel: Story = {
  render: () => (
    <GlowCard className="dgf:relative dgf:max-w-md dgf:overflow-hidden">
      <CornerBadge>Recommended</CornerBadge>
      <h3 className="dgf:text-lg dgf:font-semibold">Weekly review</h3>
      <p className="dgf:mt-2 dgf:text-[var(--dgf-color-text-muted)]">
        Reserve a short block to refresh goals and next steps.
      </p>
    </GlowCard>
  ),
};

export const WarmMarketingPreset: Story = {
  globals: { theme: 'warm' },
  render: () => (
    <Section tone="canvas" spacing="relaxed">
      <GlowCard tone="accent" className="dgf:mx-auto dgf:max-w-xl">
        <SectionHeading eyebrow="Warm preset" size="sm">A softer product voice</SectionHeading>
      </GlowCard>
    </Section>
  ),
};
