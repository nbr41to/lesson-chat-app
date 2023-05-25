import type { Meta, StoryObj } from '@storybook/react';

import { AccountEditForm } from './AccountEditForm';
import { userEvent, within } from '@storybook/testing-library';
import { dummyUsers } from '@/models/mocks/user';

const meta: Meta<typeof AccountEditForm> = {
  component: AccountEditForm,
  tags: ['autodocs'],
  args: {
    user: dummyUsers[0],
  },
};

export default meta;
type Story = StoryObj<typeof AccountEditForm>;

export const Default: Story = {
  args: {},
};
export const Editing: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = canvas.getByAltText('avatar-image');
    const fileInput = canvas.getByTestId('file-input');
    const files = [new File(['example'], 'avatar.png', { type: 'image/png' })];
    await userEvent.click(avatar);
    await userEvent.upload(fileInput, files);

    const nameInput = canvas.getByLabelText('ユーザー名');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'ゆーすけ');

    const publicIdInput = canvas.getByLabelText('ID');
    await userEvent.clear(publicIdInput);
    await userEvent.type(publicIdInput, 'yusuke234');

    const submitButton = canvas.getByRole('button', { name: '保存' });
    await userEvent.click(submitButton);
  },
};

export const EmptySubmit: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByLabelText('ユーザー名');
    await userEvent.clear(nameInput);

    const publicIdInput = canvas.getByLabelText('ID');
    await userEvent.clear(publicIdInput);

    const submitButton = canvas.getByRole('button', { name: '保存' });
    await userEvent.click(submitButton);
  },
};
