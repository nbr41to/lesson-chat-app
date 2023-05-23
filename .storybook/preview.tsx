import type { Preview } from '@storybook/react';
import React from 'react';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

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
        className={inter.className}
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
