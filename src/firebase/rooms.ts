import { getCurrentUser } from '@/firebase/authentication';
import { app } from '@/firebase/config';
import { getLatestMessage } from '@/firebase/messages';
import { uploadRoomThumbnailFile } from '@/firebase/storage';
import { Room, RoomBase, RoomListItem, User } from '@/models/types';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  setDoc,
  where,
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';

const db = getFirestore(app);

export const getRooms = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const q = query(
    collection(db, 'rooms'),
    where('userIds', 'array-contains', currentUser.uid),
  );
  const roomSnapshot = await getDocs(q);
  const rooms = roomSnapshot.docs.map((doc) => doc.data() as RoomBase);

  const roomsWithLatestMessage = (await Promise.all(
    rooms.map(async (room) => {
      const latestMessage = await getLatestMessage(room.id);

      return { ...room, latestMessage };
    }),
  )) as RoomListItem[];

  return roomsWithLatestMessage;
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

export const createRoom = async (params: {
  name: string;
  file: File;
  userIds: string[];
}) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');
  const docRef = doc(collection(db, 'rooms'));

  const thumbnailUrl = await uploadRoomThumbnailFile(params.file, docRef.id);

  const publicId = nanoid(6);
  await setDoc(docRef, {
    id: docRef.id,
    publicId,
    name: params.name,
    ownerId: currentUser.uid,
    thumbnailUrl,
    userIds: [currentUser.uid, ...params.userIds],
  });

  return docRef.id;
};

// ルーム名変更
// ルームにメンバーを追加
// ルームから退室
// ルームの削除
