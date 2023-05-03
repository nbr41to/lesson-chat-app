import type { Meta, StoryObj } from '@storybook/react';

import { FooterMenu } from './FooterMenu';

const meta: Meta<typeof FooterMenu> = {
  component: FooterMenu,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof FooterMenu>;

export const Default: Story = {
  args: {},
};
