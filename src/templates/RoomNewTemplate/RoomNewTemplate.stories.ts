import type { Meta, StoryObj } from '@storybook/react';

import { RoomNewTemplate } from './RoomNewTemplate';

const meta: Meta<typeof RoomNewTemplate> = {
  component: RoomNewTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof RoomNewTemplate>;

export const Default: Story = {
  args: {},
};
