/**
 * User
 */

export type UserBase = {
  id: string;
  publicId: string;
  name: string;
  avatarUrl: string;
  friendIds: string[];
};

export type User = UserBase & {
  friends: User[]; // firestoreから取得時に差し込む
};

export type UserUpdateParams = {
  name: string;
  publicId: string;
  avatarImage: File | null;
};

export type RoomBase = {
  id: string;
  publicId: string;
  ownerId: string;
  name: string;
  thumbnailUrl: string;
  userIds: string[];
};

export type RoomListItem = RoomBase & {
  latestMessage: string; // firestoreから取得時に差し込む
};

export type Room = RoomBase & {
  users: UserBase[]; // firestoreから取得時に差し込む
};

export type Message = {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  sendAt: Date;
};
