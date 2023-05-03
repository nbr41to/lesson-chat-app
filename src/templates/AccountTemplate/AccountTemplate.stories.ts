import type { Meta, StoryObj } from '@storybook/react';

import { AccountTemplate } from './AccountTemplate';

const meta: Meta<typeof AccountTemplate> = {
  component: AccountTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof AccountTemplate>;

export const Default: Story = {
  args: {},
};
