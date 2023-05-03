import type { Meta, StoryObj } from '@storybook/react';

import { FriendItem } from './FriendItem';

const meta: Meta<typeof FriendItem> = {
  component: FriendItem,
  tags: ['autodocs'],
  args: {
    name: 'さやか',
    avatarUrl: './avatar_1.png',
  },
};

export default meta;
type Story = StoryObj<typeof FriendItem>;

export const Default: Story = {
  args: {},
};
