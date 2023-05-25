import type { Meta, StoryObj } from '@storybook/react';

import { RoomEditForm } from './RoomEditForm';
import { dummyRoom } from '@/models/mocks/room';

const meta: Meta<typeof RoomEditForm> = {
  component: RoomEditForm,
  tags: ['autodocs'],
  args: {
    room: dummyRoom,
  },
};

export default meta;
type Story = StoryObj<typeof RoomEditForm>;

export const Default: Story = {
  args: {},
};
