import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Empty: Story = {
  args: {},
};
export const InValue: Story = {
  args: {
    value: 'あい',
  },
};
