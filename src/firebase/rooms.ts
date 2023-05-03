import { getCurrentUser } from '@/firebase/authentication';
import { app } from '@/firebase/config';
import { getLatestMessage } from '@/firebase/messages';
import { uploadRoomThumbnailFile } from '@/firebase/storage';
import {
  Room,
  RoomBase,
  RoomCreateParams,
  RoomListItem,
  RoomUpdateParams,
  User,
} from '@/models/types';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';

const db = getFirestore(app);

/* 自分が参加しているルーム一覧を取得 */
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

/* IDからルームの情報を取得 */
export const getRoom = async (roomId: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

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

/* ルームを作成 */
export const createRoom = async (params: RoomCreateParams) => {
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

/**
 * ルームの情報の更新
 * ルーム名の変更、メンバーの追加・削除
 */
export const updateRoom = async (params: RoomUpdateParams) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const docRef = doc(db, 'rooms', params.roomId);
  await updateDoc(docRef, {
    name: params.name,
    userIds: params.userIds,
  });
};

/* ルームの削除 */
export const deleteRoom = async (roomId: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not logged in');

  const docRef = doc(db, 'rooms', roomId);
  await deleteDoc(docRef);
};
