import type { Meta, StoryObj } from '@storybook/react';

import { JoinRoomTemplate } from './JoinRoomTemplate';
import { dummyRoom } from '@/models/mocks/room';

const meta: Meta<typeof JoinRoomTemplate> = {
  component: JoinRoomTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof JoinRoomTemplate>;

export const Default: Story = {
  args: {
    room: dummyRoom,
  },
};
export const Added: Story = {
  args: {
    room: dummyRoom,
    isJoined: true,
  },
};
export const NotFound: Story = {
  args: {
    room: undefined,
  },
};
