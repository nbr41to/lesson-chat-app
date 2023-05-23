import type { Meta, StoryObj } from '@storybook/react';

import { RoomsTemplate } from './RoomsTemplate';
import { dummyRoomListItems } from '@/models/mocks/room';
import { userEvent, within } from '@storybook/testing-library';
import { dummyUsers } from '@/models/mocks/user';

const meta: Meta<typeof RoomsTemplate> = {
  component: RoomsTemplate,
  tags: ['autodocs'],
  args: {
    rooms: dummyRoomListItems,
    friends: dummyUsers,
  },
};

export default meta;
type Story = StoryObj<typeof RoomsTemplate>;

export const Default: Story = {
  args: {},
};

export const CreateRoom: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addIconButton = canvas.getAllByTestId('IconButton')[0];

    await userEvent.click(addIconButton);
    await userEvent.click(canvas.getAllByText('ルーム作成')[0]);

    const nameInput = canvas.getByLabelText('ルーム名');
    await userEvent.type(nameInput, 'ルーム1');

    const fileInput = canvas.getByTestId('file-input');
    const files = [new File(['example'], 'avatar.png', { type: 'image/png' })];
    await userEvent.upload(fileInput, files);

    const submitButton = canvas.getByRole('button', { name: '作成' });
    await userEvent.click(submitButton);
  },
};
