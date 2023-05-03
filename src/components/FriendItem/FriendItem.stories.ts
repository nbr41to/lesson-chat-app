import type { Meta, StoryObj } from '@storybook/react';

import { FriendItem } from './FriendItem';

const meta: Meta<typeof FriendItem> = {
  component: FriendItem,
  tags: ['autodocs'],
  args: {
    thumbnailUrl: './avatar_1.png',
    name: 'さやか',
  },
};

export default meta;
type Story = StoryObj<typeof FriendItem>;

export const Default: Story = {
  args: {},
};
