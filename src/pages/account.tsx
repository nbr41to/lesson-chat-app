import Head from 'next/head';
import { AccountTemplate } from '@/templates/AccountTemplate';
import { useContext, useEffect, useState } from 'react';
import { User, UserUpdateParams } from '@/models/types';
import { getMe, getMyFriends, getUserByPublicId } from '@/firebase/users';
import { AuthContext } from '@/context/auth';
import { updateUser } from '@/firebase/users';
import { useRouter } from 'next/router';

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [friends, setFriends] = useState<User[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.user) return;

    (async () => {
      try {
        const resMe = await getMe();
        setUser(resMe);
        const resFriends = await getMyFriends();
        setFriends(resFriends);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [authContext.user]);

  const handleUpdate = async (params: UserUpdateParams) => {
    try {
      await updateUser(params);
      const resMe = await getMe();
      setUser(resMe);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchFriend = async (publicId: string) => {
    try {
      const user = await getUserByPublicId(publicId);
      if (!user) return alert('ユーザーが見つかりませんでした');

      router.push(`/add-friend/${user.id}?backUrl=/account`);
    } catch (error) {
      console.error(error);
    }
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
          onSearchFriend={handleSearchFriend}
        />
      )}
    </>
  );
}
