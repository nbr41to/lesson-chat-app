import type { Meta, StoryObj } from '@storybook/react';

import { RoomHeader } from './RoomHeader';

const meta: Meta<typeof RoomHeader> = {
  component: RoomHeader,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof RoomHeader>;

export const Personal: Story = {
  args: {
    name: 'つとむ',
    amount: 2,
  },
};
export const Group: Story = {
  args: {
    name: 'カフェメンバー',
    amount: 4,
  },
};
