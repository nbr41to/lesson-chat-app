import type { Meta, StoryObj } from '@storybook/react';

import { RoomSettingTemplate } from './RoomSettingTemplate';

const meta: Meta<typeof RoomSettingTemplate> = {
  component: RoomSettingTemplate,
  tags: ['autodocs'],
  args: {
    room: {
      id: 'room-id',
      ownerId: 'owner-id',
      thumbnailUrl: './avatar_1.png',
      name: 'さやか',
      userIds: ['user-id'],
      users: [],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoomSettingTemplate>;

export const Default: Story = {
  args: {},
};
