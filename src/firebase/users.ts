import { app } from '@/firebase/config';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';

const db = getFirestore(app);

/* アカウントの作成 */
export const createUser = async (params: {
  id: string;
  name: string;
  email: string;
}) => {
  const publicId = nanoid(6);

  try {
    /* IDを指定して保存 */
    await setDoc(doc(db, 'users', params.id), {
      id: params.id,
      publicId,
      name: params.name,
      email: params.email,
      avatarUrl: '',
      friendIds: [],
    });
  } catch (error) {
    console.error('Error createUser: ', error);
  }
};
