import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { RoomCreateParams, RoomListItem, User } from '@/models/types';
import { createRoom, getRooms } from '@/firebase/rooms';
import { RoomsTemplate } from '@/templates/RoomsTemplate';
import { AuthContext } from '@/context/auth';
import { getMyFriends, getUserByPublicId } from '@/firebase/users';
import { useRouter } from 'next/router';

export default function Rooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomListItem[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.user) return;

    /* ルーム一覧の取得 */
    (async () => {
      const resRooms = await getRooms();
      setRooms(resRooms);
      const resFriends = await getMyFriends();
      setFriends(resFriends || []);
    })();
  }, [authContext.user]);

  /* ルームの作成 */
  const handleOnCreateRoom = async (params: RoomCreateParams) => {
    try {
      await createRoom(params);

      /* 再取得 */
      const resRooms = await getRooms();
      setRooms(resRooms);
    } catch (error) {
      console.error(error);
    }
  };

  /* フレンドの検索 */
  const handleOnSearchFriend = async (publicId: string) => {
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
        <title>ルーム一覧 | トープ</title>
      </Head>
      <RoomsTemplate
        rooms={rooms}
        friends={friends}
        onCreateRoom={handleOnCreateRoom}
        onSearchFriend={handleOnSearchFriend}
      />
    </>
  );
}
