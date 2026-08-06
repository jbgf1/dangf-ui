import type { Preview } from '@storybook/react-vite';

import '../src/styles/index.css';
import '../src/styles/themes/warm.css';

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Theme preset',
      defaultValue: 'neutral',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'neutral', title: 'Neutral' },
          { value: 'warm', title: 'Warm' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        className={context.globals.theme === 'warm' ? 'dgf-theme-warm' : undefined}
        style={{
          minHeight: '100vh',
          padding: '2rem',
          background: 'var(--dgf-color-canvas)',
          color: 'var(--dgf-color-text)',
          fontFamily: 'var(--dgf-font-sans)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    a11y: { test: 'error' },
  },
};

export default preview;
