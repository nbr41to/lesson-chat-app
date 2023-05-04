import type { Meta, StoryObj } from '@storybook/react';

import { MultiSelectFriend } from './MultiSelectFriend';

const meta: Meta<typeof MultiSelectFriend> = {
  component: MultiSelectFriend,
  tags: ['autodocs'],
  args: {
    friends: [
      {
        name: '新参者です',
        id: 'hvXRhpSVTbSAXtlIbxN5YrEIxLX2',
        publicId: '9hO1nk',
        avatarUrl:
          'https://firebasestorage.googleapis.com/v0/b/chat-app-2023-a104a.appspot.com/o/users%2FhvXRhpSVTbSAXtlIbxN5YrEIxLX2%2FIMG_0751.PNG?alt=media&token=912c17bc-1e20-482a-b785-3b6ea199734d',
        friendIds: ['7DfBqmb8WmNr6malTZvje7qwY2Y2'],
      },
      {
        id: 'paPVFUZHApbygZz2VW7mm2FprQl2',
        publicId: 'HKYz15',
        name: 'テストマン',
        friendIds: ['7DfBqmb8WmNr6malTZvje7qwY2Y2'],
        avatarUrl: 'https://picsum.photos/100',
      },
    ],
    selectedIds: ['paPVFUZHApbygZz2VW7mm2FprQl2'],
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelectFriend>;

export const Default: Story = {
  args: {},
};
