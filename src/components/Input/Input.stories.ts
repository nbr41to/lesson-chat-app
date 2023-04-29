import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'グループ名',
    placeholder: 'ここに入力',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Empty: Story = {
  args: {},
};
export const InValue: Story = {
  args: {
    value: 'カフェともだち',
  },
};
