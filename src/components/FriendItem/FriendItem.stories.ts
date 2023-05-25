import type { Meta, StoryObj } from '@storybook/react';

import { FriendItem } from './FriendItem';
import { dummyUsers } from '@/models/mocks/user';

const meta: Meta<typeof FriendItem> = {
  component: FriendItem,
  tags: ['autodocs'],
  args: {
    user: dummyUsers[0],
  },
};

export default meta;
type Story = StoryObj<typeof FriendItem>;

export const Default: Story = {
  args: {},
};
