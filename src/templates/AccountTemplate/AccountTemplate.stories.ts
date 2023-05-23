import type { Meta, StoryObj } from '@storybook/react';

import { AccountTemplate } from './AccountTemplate';
import { dummyUsers } from '@/models/mocks/user';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof AccountTemplate> = {
  component: AccountTemplate,
  tags: ['autodocs'],
  args: {
    user: dummyUsers[0],
    friends: dummyUsers,
  },
};

export default meta;
type Story = StoryObj<typeof AccountTemplate>;

export const Default: Story = {
  args: {},
};

export const ClickSettingIconButton: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const settingIconButton = canvas.getAllByTestId('IconButton')[0];
    await userEvent.click(settingIconButton);
  },
};
