import type { Meta, StoryObj } from '@storybook/react';

import { RoomMembers } from './RoomMembers';

const meta: Meta<typeof RoomMembers> = {
  component: RoomMembers,
  tags: ['autodocs'],
  args: {
    room: {
      id: 'room-id',
      publicId: 'public-id',
      ownerId: 'owner-id',
      thumbnailUrl: './avatar_1.png',
      name: 'さやか',
      userIds: ['user-id'],
      users: [
        {
          id: 'user-id-1',
          publicId: 'public-id-1',
          name: 'さやか',
          avatarUrl: './avatar_1.png',
          friendIds: ['user-id-2'],
        },
        {
          id: 'user-id-2',
          publicId: 'public-id-2',
          name: 'ゆうこ',
          avatarUrl: './avatar_1.png',
          friendIds: ['user-id-1'],
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoomMembers>;

export const Default: Story = {
  args: {},
};
