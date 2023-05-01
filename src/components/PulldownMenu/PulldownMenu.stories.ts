import type { Meta, StoryObj } from '@storybook/react';

import { PulldownMenu } from './PulldownMenu';
import ChatCircle from 'public/chat_circle.svg';
import UserPlus from 'public/user_plus.svg';
import { createElement } from 'react';
import { action } from '@storybook/addon-actions';
import { PlusCircleIcon } from '@/components/icons';

const meta: Meta<typeof PulldownMenu> = {
  component: PulldownMenu,
  tags: ['autodocs'],
  args: {
    buttonIcon: createElement(PlusCircleIcon),
    data: [
      {
        icon: createElement(ChatCircle),
        label: 'ルーム作成',
        onClick: action('menu_1'),
      },
      {
        icon: createElement(UserPlus),
        label: 'フレンド追加',
        onClick: action('menu_2'),
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof PulldownMenu>;

export const Default: Story = {
  args: {},
};
