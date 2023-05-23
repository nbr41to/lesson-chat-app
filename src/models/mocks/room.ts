import { dummyUsers } from '@/models/mocks/user';
import { Room, RoomBase, RoomListItem } from '@/models/types';

export const dummyRoomBase: RoomBase = {
  id: 'room-id-1',
  publicId: 'public-id-1',
  ownerId: 'user-id-1',
  name: 'room-name-1',
  thumbnailUrl: './avatar_1.png',
  userIds: ['user-id-1', 'user-id-2'],
};

export const dummyRoomListItems: RoomListItem[] = [
  {
    id: 'room-id-1',
    publicId: 'public-id-1',
    ownerId: 'user-id-1',
    name: 'room-name-1',
    thumbnailUrl: './avatar_1.png',
    userIds: ['user-id-1', 'user-id-2'],
    latestMessage: 'こんにちは',
  },
  {
    id: 'room-id-2',
    publicId: 'public-id-2',
    ownerId: 'user-id-2',
    name: 'room-name-2',
    thumbnailUrl: './avatar_1.png',
    userIds: ['user-id-1', 'user-id-2'],
    latestMessage: 'はい、どうもこんにちは。\n今日はいい天気ですね。',
  },
  {
    id: 'room-id-3',
    publicId: 'public-id-3',
    ownerId: 'user-id-3',
    name: 'room-name-3',
    thumbnailUrl: './avatar_1.png',
    userIds: ['user-id-1', 'user-id-2'],
    latestMessage: '最新のメッセージが入ります。',
  },
];

export const dummyRoom: Room = {
  id: 'room-id-1',
  publicId: 'public-id-1',
  ownerId: 'user-id-1',
  name: 'room-name-1',
  thumbnailUrl: './avatar_1.png',
  userIds: ['user-id-1', 'user-id-2'],
  users: dummyUsers,
};
