import type { Meta, StoryObj } from '@storybook/react';

import { SignUpTemplate } from './SignUpTemplate';

const meta: Meta<typeof SignUpTemplate> = {
  component: SignUpTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof SignUpTemplate>;

export const Default: Story = {
  args: {},
};
