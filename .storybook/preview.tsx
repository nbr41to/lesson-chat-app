import type { Preview } from '@storybook/react';
import React from 'react';
import '@/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 'var(--main-width)',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
