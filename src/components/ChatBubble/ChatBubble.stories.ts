import type { Meta, StoryObj } from '@storybook/react';

import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  component: ChatBubble,
  tags: ['autodocs'],
  args: {
    message: 'さやかとカフェいるけどみんな来れる？',
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Own: Story = {
  args: {
    isOwn: true,
  },
};

export const Other: Story = {
  args: {
    isOwn: false,
    name: 'さやか',
    iconUrl: './avatar_1.png',
  },
};
