import type { Meta, StoryObj } from '@storybook/react';

import { AccountEditForm } from './AccountEditForm';

const meta: Meta<typeof AccountEditForm> = {
  component: AccountEditForm,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof AccountEditForm>;

export const Default: Story = {
  args: {},
};
