import type { Meta, StoryObj } from '@storybook/react';

import { RoomMemberTemplate } from './RoomMemberTemplate';

const meta: Meta<typeof RoomMemberTemplate> = {
  component: RoomMemberTemplate,
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
  },
};

export default meta;
type Story = StoryObj<typeof RoomMemberTemplate>;

export const Default: Story = {
  args: {},
};
