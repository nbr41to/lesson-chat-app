import Head from 'next/head';
import { AccountTemplate } from '@/templates/AccountTemplate';
import { useContext, useEffect, useState } from 'react';
import { User, UserUpdateParams } from '@/models/types';
import { getMe, getMyFriends } from '@/firebase/users';
import { AuthContext } from '@/context/auth';
import { updateUser } from '@/firebase/users';

export default function Account() {
  const [user, setUser] = useState<User>();
  const [friends, setFriends] = useState<User[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.user) return;

    (async () => {
      const resMe = await getMe();
      setUser(resMe);
      const resFriends = await getMyFriends();
      setFriends(resFriends || []);
    })();
  }, [authContext.user]);

  const handleUpdate = async (params: UserUpdateParams) => {
    await updateUser(params);
    const resMe = await getMe();
    setUser(resMe);
  };

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      {user && (
        <AccountTemplate
          user={user}
          friends={friends}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
