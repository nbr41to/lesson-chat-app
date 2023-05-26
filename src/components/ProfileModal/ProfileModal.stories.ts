import type { Meta, StoryObj } from '@storybook/react';

import { ProfileModal } from './ProfileModal';
import { dummyUsers } from '@/models/mocks/user';

const meta: Meta<typeof ProfileModal> = {
  component: ProfileModal,
  args: {
    isOpen: true,
    user: dummyUsers[0],
  },
};

export default meta;
type Story = StoryObj<typeof ProfileModal>;

export const Default: Story = {
  args: {},
};
