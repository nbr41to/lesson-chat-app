import type { Meta, StoryObj } from '@storybook/react';

import { AddFriendTemplate } from './AddFriendTemplate';
import { dummyUsers } from '@/models/mocks/user';

const meta: Meta<typeof AddFriendTemplate> = {
  component: AddFriendTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof AddFriendTemplate>;

export const Default: Story = {
  args: {
    user: dummyUsers[0],
  },
};
export const Added: Story = {
  args: {
    user: dummyUsers[0],
    isAdded: true,
  },
};
export const NotFound: Story = {
  args: {
    user: undefined,
  },
};
