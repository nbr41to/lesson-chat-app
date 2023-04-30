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
  users: User[];
  messages: Message[];
  thumbnailUrl: string;
};
