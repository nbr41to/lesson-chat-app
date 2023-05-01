import { getCurrentUser } from '@/firebase/authentication';
import { app } from '@/firebase/config';
import { Message } from '@/types';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from 'firebase/firestore/lite';

const db = getFirestore(app);

/* roomIdからMessagesを取得 */
export const getMessages = async (roomId: string) => {
  const q = query(collection(db, 'messages'), where('roomId', '==', roomId));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data() as Message);
};

/* 新規Messagesを追加 */
export const addMessage = async (params: {
  roomId: string;
  content: string;
}) => {
  try {
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
  } catch (error) {
    console.error('Error addMessage: ', error);
  }
};
