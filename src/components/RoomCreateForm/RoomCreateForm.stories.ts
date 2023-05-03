import type { Meta, StoryObj } from '@storybook/react';

import { RoomCreateForm } from './RoomCreateForm';

const meta: Meta<typeof RoomCreateForm> = {
  component: RoomCreateForm,
  tags: ['autodocs'],
  args: {
    friends: [],
  },
};

export default meta;
type Story = StoryObj<typeof RoomCreateForm>;

export const Default: Story = {
  args: {},
};
