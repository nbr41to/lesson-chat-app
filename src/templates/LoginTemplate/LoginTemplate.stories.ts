import type { Meta, StoryObj } from '@storybook/react';

import { LoginTemplate } from './LoginTemplate';

const meta: Meta<typeof LoginTemplate> = {
  component: LoginTemplate,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof LoginTemplate>;

export const Default: Story = {
  args: {},
};
