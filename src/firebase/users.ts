import { getCurrentUser } from '@/firebase/authentication';
import { app } from '@/firebase/config';
import { uploadAvatarFile } from '@/firebase/storage';
import { User, UserBase, UserUpdateParams } from '@/models/types';
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
  arrayUnion,
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

  /* IDを指定して保存 */
  await setDoc(doc(db, 'users', params.id), {
    id: params.id,
    publicId,
    name: params.name,
    email: params.email,
    avatarUrl: '',
    friendIds: [],
  });
};

/* 自分のユーザ情報を取得 */
export const getMe = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');
  const docRef = await getDoc(doc(db, 'users', currentUser.uid));
  return docRef.data() as User;
};

/* フレンド一覧を取得 */
export const getMyFriends = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const q = query(
    collection(db, 'users'),
    where('friendIds', 'array-contains', currentUser.uid),
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data() as User);
};

/* ユーザ情報の更新 */
export const updateUser = async (params: UserUpdateParams) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const body = {
    name: params.name,
    publicId: params.publicId,
    avatarUrl: 'https://placehold.jp/80x80.png',
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
      return v;
    }),
  );

  await updateDoc(docRef, paramsWithoutUndefined);
};

/* Public IDからユーザを取得 */
export const getUserByPublicId = async (publicId: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const q = query(collection(db, 'users'), where('publicId', '==', publicId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) return null;

  return querySnapshot.docs[0].data() as UserBase;
};

/* IDからユーザを取得 */
export const getUserById = async (userId: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const docRef = await getDoc(doc(db, 'users', userId));

  return docRef.data() as UserBase;
};

/* フレンド追加 */
export const addFriend = async (friendId: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  /* 自分のデータの更新 */
  const meDocRef = doc(db, 'users', currentUser.uid);
  await updateDoc(meDocRef, {
    friendIds: arrayUnion(friendId),
  });

  /* 相手のデータの更新 */
  const friendDocRef = doc(db, 'users', friendId);
  await updateDoc(friendDocRef, {
    friendIds: arrayUnion(currentUser.uid),
  });
};
