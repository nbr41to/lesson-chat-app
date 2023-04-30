import type { Meta, StoryObj } from '@storybook/react';

import { RoomsTemplate } from './RoomsTemplate';

const meta: Meta<typeof RoomsTemplate> = {
  component: RoomsTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof RoomsTemplate>;

export const Default: Story = {
  args: {},
};
