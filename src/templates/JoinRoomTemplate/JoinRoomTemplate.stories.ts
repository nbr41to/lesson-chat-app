import type { Meta, StoryObj } from '@storybook/react';

import { JoinRoomTemplate } from './JoinRoomTemplate';

const meta: Meta<typeof JoinRoomTemplate> = {
  component: JoinRoomTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof JoinRoomTemplate>;

export const Default: Story = {
  args: {},
};
export const Added: Story = {
  args: {
    isJoined: true,
  },
};
export const NotFound: Story = {
  args: {
    room: undefined,
  },
};
