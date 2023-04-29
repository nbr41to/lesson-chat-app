import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['autodocs'],
  args: {
    url: './avatar_1.png',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {},
};

export const InName: Story = {
  args: {
    name: 'さやか',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    name: 'さやか',
  },
};
