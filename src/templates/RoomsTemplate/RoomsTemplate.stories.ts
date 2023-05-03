import type { Meta, StoryObj } from '@storybook/react';

import { RoomsTemplate } from './RoomsTemplate';

const meta: Meta<typeof RoomsTemplate> = {
  component: RoomsTemplate,
  tags: ['autodocs'],
  args: {
    rooms: [
      {
        id: 'room-id',
        publicId: 'public-id',
        ownerId: 'owner-id',
        thumbnailUrl: './avatar_1.png',
        name: 'さやか',
        userIds: ['user-id'],
        latestMessage: '今日はありがとね！',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof RoomsTemplate>;

export const Default: Story = {
  args: {},
};
