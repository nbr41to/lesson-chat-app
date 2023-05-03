import { getCurrentUser } from '@/firebase/authentication';
import { app } from '@/firebase/config';
import { CreateRoomParams, Room, User } from '@/types';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from 'firebase/firestore/lite';

const db = getFirestore(app);

export const getRooms = async () => {
  const roomSnapshot = await getDocs(collection(db, 'rooms'));

  return roomSnapshot.docs.map((doc) => doc.data() as Room);
};

export const getRoom = async (roomId: string) => {
  const roomRef = await getDoc(doc(db, 'rooms', roomId));
  const room = roomRef.data();

  const users = await Promise.all(
    room?.userIds.map(async (userId: string) => {
      const userRef = await getDoc(doc(db, 'users', userId));

      return userRef.data() as User;
    }),
  );

  return { ...room, users } as Room;
};

export const createRoom = async (params: CreateRoomParams) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');
  const docRef = doc(collection(db, 'rooms'));

  await setDoc(docRef, {
    id: docRef.id,
    name: params.name,
    ownerId: currentUser.uid,
    thumbnailUrl: '',
    userIds: [currentUser.uid, ...params.userIds],
  });

  return docRef.id;
};

// ルーム名変更
// ルームにメンバーを追加
