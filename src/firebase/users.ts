import { getCurrentUser } from '@/firebase/authentication';
import { app } from '@/firebase/config';
import { uploadAvatarFile } from '@/firebase/storage';
import { User, UserUpdateParams } from '@/models/types';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  where,
  query,
  updateDoc,
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

/* IDからユーザ情報を取得 */
export const getMe = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');
  try {
    const docRef = await getDoc(doc(db, 'users', currentUser.uid));
    return docRef.data() as User;
  } catch (error) {
    console.error('Error getUser: ', error);
  }
};

/* フレンド一覧を取得 */
export const getMyFriends = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  try {
    const q = query(
      collection(db, 'users'),
      where('friendIds', 'array-contains', currentUser.uid),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data() as User);
  } catch (error) {
    console.error('Error getUser: ', error);
  }
};

/* ユーザ情報の更新 */
export const updateUser = async (params: UserUpdateParams) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  try {
    const body = {
      name: params.name,
      publicId: params.publicId,
      avatarUrl: '',
    };
    if (params.avatarImage) {
      body.avatarUrl = await uploadAvatarFile(
        params.avatarImage,
        currentUser.uid,
      );
    }
    const docRef = doc(db, 'users', currentUser.uid);
    const paramsWithoutUndefined = Object.fromEntries(
      Object.entries(body).filter(([, v]) => {
        console.log(v);
        return v;
      }),
    );

    console.log(paramsWithoutUndefined);

    await updateDoc(docRef, paramsWithoutUndefined);
  } catch (error) {
    console.error('Error updateUser: ', error);
  }
};
