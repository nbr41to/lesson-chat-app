import type { Meta, StoryObj } from '@storybook/react';

import { MessageTextArea } from './MessageTextArea';

const meta: Meta<typeof MessageTextArea> = {
  component: MessageTextArea,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof MessageTextArea>;

export const Empty: Story = {
  args: {},
};
export const InValue: Story = {
  args: {
    value: '今日暇？',
  },
};
