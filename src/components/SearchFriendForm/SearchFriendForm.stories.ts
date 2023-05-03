import type { Meta, StoryObj } from '@storybook/react';

import { SearchFriendForm } from './SearchFriendForm';

const meta: Meta<typeof SearchFriendForm> = {
  component: SearchFriendForm,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof SearchFriendForm>;

export const Default: Story = {
  args: {},
};
