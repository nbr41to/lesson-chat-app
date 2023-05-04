import { getCurrentUser } from '@/firebase/authentication';
import { app } from '@/firebase/config';
import { Message } from '@/models/types';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  setDoc,
  limit,
} from 'firebase/firestore/lite';

const db = getFirestore(app);

/* 新規Messagesを送信 */
export const sendMessage = async (params: {
  roomId: string;
  content: string;
}) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const docRef = doc(collection(db, 'messages'));
  await setDoc(docRef, {
    id: docRef.id,
    roomId: params.roomId,
    userId: currentUser?.uid,
    content: params.content,
    sendAt: new Date(),
  });
};

/* roomIdから最新のMessageを取得 */
export const getLatestMessage = async (roomId: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const q = query(
    collection(db, 'messages'),
    where('roomId', '==', roomId),
    orderBy('sendAt', 'desc'),
    limit(3),
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length === 0) return '';

  return (querySnapshot.docs[0].data() as Message).content;
};
