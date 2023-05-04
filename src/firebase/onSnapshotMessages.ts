import { app } from '@/firebase/config';
import { Message } from '@/models/types';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore/lite';

const db = getFirestore(app);

/* roomIdからMessagesをリアルタイムで取得 */
export const onSnapshotMessages = (
  roomId: string,
  callback: (messages: Message[]) => void,
) => {
  const q = query(collection(db, 'messages'), where('roomId', '==', roomId));

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => doc.data());
    const sortedMessages = messages.sort(
      (a, b) => a.sendAt.seconds - b.sendAt.seconds,
    ) as Message[];
    callback(sortedMessages);
  });
};
