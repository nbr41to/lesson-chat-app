import { User } from '@/models/types';

export const dummyUsers: User[] = [
  {
    id: 'user-id-1',
    publicId: 'public-id-1',
    name: 'さやか',
    avatarUrl: './avatar_1.png',
    friendIds: ['user-id-2'],
  },
  {
    id: 'user-id-2',
    publicId: 'public-id-2',
    name: 'ゆうこ',
    avatarUrl: './avatar_1.png',
    friendIds: ['user-id-1'],
  },
  {
    id: 'user-id-3',
    publicId: 'public-id-3',
    name: 'ぼっちくん',
    avatarUrl: './avatar_1.png',
    friendIds: [],
  },
];
