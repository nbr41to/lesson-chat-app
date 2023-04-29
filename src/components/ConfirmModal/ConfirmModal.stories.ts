import type { Meta, StoryObj } from '@storybook/react';

import { ConfirmModal } from './ConfirmModal';

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  args: {
    open: true,
    message: '本当にグループを退会しますか？',
    primaryLabel: '退会する',
    secondaryLabel: 'キャンセル',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {},
};

export const Small: Story = {
  args: {},
};
