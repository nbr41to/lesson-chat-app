import type { Meta, StoryObj } from '@storybook/react';

import { AddFriendTemplate } from './AddFriendTemplate';

const meta: Meta<typeof AddFriendTemplate> = {
  component: AddFriendTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof AddFriendTemplate>;

export const Default: Story = {
  args: {},
};
export const Added: Story = {
  args: {
    isAdded: true,
  },
};
export const NotFound: Story = {
  args: {
    user: undefined,
  },
};
