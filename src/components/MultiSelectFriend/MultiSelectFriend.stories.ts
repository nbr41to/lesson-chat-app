import type { Meta, StoryObj } from '@storybook/react';

import { MultiSelectFriend } from './MultiSelectFriend';
import { dummyUsers } from '@/models/mocks/user';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MultiSelectFriend> = {
  component: MultiSelectFriend,
  tags: ['autodocs'],
  args: {
    friends: dummyUsers,
    selectedIds: [],
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelectFriend>;

export const Default: Story = {
  args: {},
};

export const Search: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText('検索');
    await userEvent.type(searchInput, 'さや');

    await expect(canvas.getByText('さやか')).toBeInTheDocument();
    await expect(canvas.queryByText('ゆうこ')).not.toBeInTheDocument();
    await expect(canvas.queryByText('ぼっちくん')).not.toBeInTheDocument();
  },
};

export const Select: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const inputCheckboxes = canvasElement.querySelectorAll(
      'input[type="checkbox"]',
    );
    await userEvent.click(inputCheckboxes[1]);
    await userEvent.click(inputCheckboxes[2]);
    await userEvent.click(inputCheckboxes[1]);
  },
};
