import type { Meta, StoryObj } from '@storybook/react';

import { RoomItem } from './RoomItem';

const meta: Meta<typeof RoomItem> = {
  component: RoomItem,
  tags: ['autodocs'],
  args: {
    room: {
      id: 'room-id',
      ownerId: 'owner-id',
      thumbnailUrl: './avatar_1.png',
      name: 'さやか',
      userIds: ['user-id'],
      users: [],
    },
    latestMessage: 'カフェいるけど来れる？',
  },
};

export default meta;
type Story = StoryObj<typeof RoomItem>;

export const Default: Story = {
  args: {},
};
export const LongLatestMessage: Story = {
  args: {
    latestMessage:
      'カフェいるけど来れる？カフェいるけど来れる？カフェいるけど来れる？カフェいるけど来れる？カフェいるけど来れる？',
  },
};
