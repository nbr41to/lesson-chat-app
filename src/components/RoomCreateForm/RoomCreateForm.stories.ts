import type { Meta, StoryObj } from '@storybook/react';

import { RoomCreateForm } from './RoomCreateForm';
import { dummyUsers } from '@/models/mocks/user';

const meta: Meta<typeof RoomCreateForm> = {
  component: RoomCreateForm,
  tags: ['autodocs'],
  args: {
    friends: dummyUsers,
  },
};

export default meta;
type Story = StoryObj<typeof RoomCreateForm>;

export const Default: Story = {
  args: {},
};
