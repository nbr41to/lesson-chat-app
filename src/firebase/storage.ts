import { app } from '@/firebase/config';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const storage = getStorage(app);

export const uploadRoomThumbnailFile = async (file: File, roomId: string) => {
  const storageRef = ref(storage, 'thumbnails/' + roomId + '/' + file.name);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
};

export const uploadAvatarFile = async (file: File, uid: string) => {
  const storageRef = ref(storage, 'users/' + uid + '/' + file.name);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
};

export const deleteFile = async (url: string) => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};
