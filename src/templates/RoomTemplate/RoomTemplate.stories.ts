import type { Meta, StoryObj } from '@storybook/react';

import { RoomTemplate } from './RoomTemplate';

const meta: Meta<typeof RoomTemplate> = {
  component: RoomTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof RoomTemplate>;

export const Default: Story = {
  args: {},
};
