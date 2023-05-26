import Head from 'next/head';
import { AccountTemplate } from '@/templates/AccountTemplate';
import { useContext, useEffect, useState } from 'react';
import { User, UserUpdateParams } from '@/models/types';
import { getMe, getMyFriends, getUserByPublicId } from '@/firebase/users';
import { AuthContext } from '@/context/auth';
import { updateUser } from '@/firebase/users';
import { useRouter } from 'next/router';
import { logout } from '@/firebase/authentication';

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [friends, setFriends] = useState<User[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.user) return;

    (async () => {
      try {
        /* ユーザ情報の取得 */
        const resMe = await getMe();
        setUser(resMe);
        /* フレンドの情報の取得 */
        const resFriends = await getMyFriends();
        setFriends(resFriends);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [authContext.user]);

  /* ユーザ情報の更新 */
  const handleOnUpdate = async (params: UserUpdateParams) => {
    try {
      await updateUser(params);

      /* 再取得 */
      const resMe = await getMe();
      setUser(resMe);
    } catch (error) {
      console.error(error);
    }
  };

  /* ユーザの検索 */
  const handleOnSearchFriend = async (publicId: string) => {
    try {
      const user = await getUserByPublicId(publicId);
      if (!user) return alert('ユーザーが見つかりませんでした');

      router.push(`/add-friend/${user.id}?backUrl=/account`);
    } catch (error) {
      console.error(error);
    }
  };

  /* アカウントの削除 */
  const handleOnDeleteMe = async () => {};

  /* フレンドとルームを開始 */
  const handleOnStartRoom = async (friendId: string) => {};

  /* フレンドの削除 */
  const handleOnDeleteFriend = async (friendId: string) => {};

  return (
    <>
      <Head>
        <title>プロフィール | トープ</title>
      </Head>
      {user && (
        <AccountTemplate
          user={user}
          friends={friends}
          onUpdate={handleOnUpdate}
          onSearchFriend={handleOnSearchFriend}
          onChatStart={handleOnStartRoom}
          onDeleteMe={handleOnDeleteMe}
          onDeleteFriend={handleOnDeleteFriend}
          onLogout={logout}
        />
      )}
    </>
  );
}
