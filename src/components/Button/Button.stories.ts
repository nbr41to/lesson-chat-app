import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'large',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};
export const Small: Story = {
  args: {
    size: 'small',
  },
};
