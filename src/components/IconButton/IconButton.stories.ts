import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './IconButton';
import { DotsThreeIcon, PlusCircleIcon } from '@/components/icons';
import { createElement } from 'react';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const PlusCircle: Story = {
  args: {
    icon: createElement(PlusCircleIcon),
  },
};

export const DotsThree: Story = {
  args: {
    icon: createElement(DotsThreeIcon),
  },
};
