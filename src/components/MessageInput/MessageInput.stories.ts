import type { Meta, StoryObj } from '@storybook/react';

import { MessageInput } from './MessageInput';

const meta: Meta<typeof MessageInput> = {
  component: MessageInput,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Empty: Story = {
  args: {},
};
export const InValue: Story = {
  args: {
    value: '今日暇？',
  },
};
