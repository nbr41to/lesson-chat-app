import type { Meta, StoryObj } from '@storybook/react';

import { ConfirmModal } from './ConfirmModal';

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  args: {
    isOpen: true,
    message: '本当にグループを退会しますか？',
    primaryLabel: '退会する',
    secondaryLabel: 'キャンセル',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {},
};
