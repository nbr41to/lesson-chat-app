import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { NestedPageHeader } from './NestedPageHeader';
import { createElement } from 'react';
import { ChatCircleIcon, UserPlusWhiteIcon } from '@/icons';

const meta: Meta<typeof NestedPageHeader> = {
  component: NestedPageHeader,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof NestedPageHeader>;

export const Default: Story = {
  args: {
    title: 'メンバー',
  },
};

export const InMenu: Story = {
  args: {
    title: 'メンバー',
    menuItems: [
      {
        icon: createElement(ChatCircleIcon),
        label: 'ルーム作成',
        onClick: action('menu_1'),
      },
      {
        icon: createElement(UserPlusWhiteIcon),
        label: 'フレンド追加',
        onClick: action('menu_2'),
      },
    ],
  },
};
