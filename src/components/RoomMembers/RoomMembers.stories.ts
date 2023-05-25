import type { Meta, StoryObj } from '@storybook/react';

import { RoomMembers } from './RoomMembers';
import { dummyRoom } from '@/models/mocks/room';
import { dummyUsers } from '@/models/mocks/user';

const meta: Meta<typeof RoomMembers> = {
  component: RoomMembers,
  tags: ['autodocs'],
  args: {
    room: dummyRoom,
    friends: dummyUsers,
  },
};

export default meta;
type Story = StoryObj<typeof RoomMembers>;

export const Default: Story = {
  args: {},
};
