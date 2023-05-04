import { app } from '@/firebase/config';
import { createUser } from '@/firebase/users';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

const auth = getAuth(app);

/* アカウント登録 */
export const signUp = async (params: {
  name: string;
  email: string;
  password: string;
}) => {
  /* Authenticationへ登録 */
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    params.email,
    params.password,
  );

  /* DBに登録 */
  const user = userCredential.user;
  await createUser({
    id: user.uid,
    name: params.name,
    email: params.email,
  });

  return user;
};

/* ログイン */
export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  return user;
};

/* ログアウト */
export const logout = async () => {
  await signOut(auth);
};

/* 認証ユーザの取得 */
export const getCurrentUser = () => auth.currentUser;

/* 認証状態の監視 */
export const onAuthStateChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
