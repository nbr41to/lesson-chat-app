import { Message } from '@/models/types';

export const dummyMessages: Message[] = [
  {
    id: 'message-id-1',
    roomId: 'room-id-1',
    userId: 'user-id-1',
    content: 'こんにちは',
    sendAt: new Date(),
  },
  {
    id: 'message-id-2',
    roomId: 'room-id-1',
    userId: 'user-id-2',
    content: 'はい、どうもこんにちは。\n今日はいい天気ですね。',
    sendAt: new Date(),
  },
];
