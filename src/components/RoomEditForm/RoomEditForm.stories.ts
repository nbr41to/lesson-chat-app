import type { Meta, StoryObj } from '@storybook/react';

import { RoomEditForm } from './RoomEditForm';

const meta: Meta<typeof RoomEditForm> = {
  component: RoomEditForm,
  tags: ['autodocs'],
  args: {
    room: {
      id: 'room-id',
      publicId: 'public-id',
      ownerId: 'owner-id',
      thumbnailUrl: './avatar_1.png',
      name: 'さやか',
      userIds: ['user-id'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoomEditForm>;

export const Default: Story = {
  args: {},
};
