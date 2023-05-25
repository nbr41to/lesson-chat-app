import type { Meta, StoryObj } from '@storybook/react';

import { RoomItem } from './RoomItem';
import { dummyRoomListItems } from '@/models/mocks/room';

const meta: Meta<typeof RoomItem> = {
  component: RoomItem,
  tags: ['autodocs'],
  args: {
    room: dummyRoomListItems[0],
  },
};

export default meta;
type Story = StoryObj<typeof RoomItem>;

export const Default: Story = {
  args: {},
};
export const LongLatestMessage: Story = {
  args: {
    room: {
      id: 'room-id',
      publicId: 'public-id',
      ownerId: 'owner-id',
      thumbnailUrl: './avatar_1.png',
      name: 'さやか',
      userIds: ['user-id'],
      latestMessage:
        'カフェいるけど来れる？カフェいるけど来れる？カフェいるけど来れる？カフェいるけど来れる？カフェいるけど来れる？',
    },
  },
};
