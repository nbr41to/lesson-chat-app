import type { Meta, StoryObj } from '@storybook/react';

import { RoomTemplate } from './RoomTemplate';
import { dummyRoom } from '@/models/mocks/room';
import { dummyUsers } from '@/models/mocks/user';
import { dummyMessages } from '@/models/mocks/message';

const meta: Meta<typeof RoomTemplate> = {
  component: RoomTemplate,
  tags: ['autodocs'],
  args: {
    room: dummyRoom,
    friends: dummyUsers,
    messages: dummyMessages,
  },
};

export default meta;
type Story = StoryObj<typeof RoomTemplate>;

export const Default: Story = {
  args: {},
};
