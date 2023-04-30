import { app } from '@/firebase/config';
import { Room } from '@/types';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore/lite';

const db = getFirestore(app);

export const getRooms = async () => {
  const roomSnapshot = await getDocs(collection(db, 'rooms'));

  return roomSnapshot.docs.map((doc) => doc.data() as Room);
};

export const getRoom = async (roomId: string) => {
  const docRef = await getDoc(doc(db, 'rooms', roomId));

  return docRef.data() as Room;
};
