import { User } from '@/models/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { addFriend, getUserById } from '@/firebase/users';
import { AddFriendTemplate } from '@/templates/AddFriendTemplate';
import { AuthContext } from '@/context/auth';

export default function AddFriend() {
  const router = useRouter();
  const userId = router.query.id as string;
  const [user, setUser] = useState<User>();
  const authContext = useContext(AuthContext);

  /* 追加済かどうかのフラグ */
  const isAdded = useMemo(() => {
    if (!user) return true;
    if (!authContext.user) return true;
    if (user.id === authContext.user.uid) return true;

    return user.friendIds.includes(authContext.user.uid);
  }, [user, authContext.user]);

  useEffect(() => {
    if (!authContext.user || !userId) return;

    /* ユーザ情報の取得 */
    (async () => {
      const response = await getUserById(userId);
      setUser(response);
    })();
  }, [userId, authContext.user]);

  /* フレンド追加 */
  const handleOnAddFriend = async () => {
    if (!user || isAdded) return;
    try {
      await addFriend(user.id);
      const backPath = router.query.backUrl as string;
      await router.push(backPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>フレンド検索 | トープ</title>
      </Head>
      <AddFriendTemplate
        user={user}
        isAdded={isAdded}
        onAddFriend={handleOnAddFriend}
      />
    </>
  );
}
