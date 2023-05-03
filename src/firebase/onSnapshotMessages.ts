import { app } from '@/firebase/config';
import { Message } from '@/models/types';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

const db = getFirestore(app);

/* roomIdからMessagesをリアルタイムで取得 */
export const onSnapshotMessages = (
  roomId: string,
  callback: (messages: Message[]) => void,
) => {
  const q = query(collection(db, 'messages'), where('roomId', '==', roomId));

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => doc.data() as Message);
    callback(messages.reverse());
  });
};
