import type { Meta, StoryObj } from '@storybook/react';

import { PulldownMenu } from './PulldownMenu';
import ChatCircle from 'public/chat_circle.svg';
import UserPlusWhite from 'public/user_plus_white.svg';
import { createElement } from 'react';
import { action } from '@storybook/addon-actions';
import { PlusCircleIcon } from '@/icons';
import { userEvent, within } from '@storybook/testing-library';

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
        icon: createElement(UserPlusWhite),
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

export const ClickMenu: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const iconButton = canvasElement.querySelector('button');

    await userEvent.click(iconButton!);
    await userEvent.click(canvas.getByText('ルーム作成'));
    await userEvent.click(iconButton!);
    await userEvent.click(canvas.getByText('フレンド追加'));
  },
};
export const ClickOverlay: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const iconButton = canvasElement.querySelector('button');

    await userEvent.click(iconButton!);
    await userEvent.click(canvas.getByTestId('PulldownMenuOverlay'));
  },
};
