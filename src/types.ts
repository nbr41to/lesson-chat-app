export type User = {
  id: string;
  publicId: string;
  name: string;
  avatarUrl: string;
  friendIds: string[];
};

export type Message = {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  sendAt: Date;
};

export type Room = {
  id: string;
  ownerId: string;
  name: string;
  userIds: string[];
  users: User[];
  thumbnailUrl: string;
};

export type CreateRoomParams = Omit<Room, 'id' | 'ownerId' | 'users'>;
