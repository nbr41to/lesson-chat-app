import { UserBase } from '@/models/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { addFriend, getUserById } from '@/firebase/users';
import { AddFriendTemplate } from '@/templates/AddFriendTemplate';
import { AuthContext } from '@/context/auth';

export default function AddFriend() {
  const router = useRouter();
  const userId = router.query.id as string;
  const [user, setUser] = useState<UserBase>();
  const authContext = useContext(AuthContext);

  const isAdded = useMemo(() => {
    if (!user) return true;
    if (!authContext.user) return true;
    if (user.id === authContext.user.uid) return true;

    return user.friendIds.includes(authContext.user.uid);
  }, [user, authContext.user]);

  useEffect(() => {
    if (!authContext.user || !userId) return;

    (async () => {
      const response = await getUserById(userId);
      setUser(response);
    })();
  }, [userId, authContext.user]);

  const handleAddFriend = async () => {
    if (!user) return;
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
        <title>Room</title>
      </Head>
      <AddFriendTemplate
        user={user}
        isAdded={isAdded}
        onAddFriend={handleAddFriend}
      />
    </>
  );
}
