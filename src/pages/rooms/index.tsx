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

    (async () => {
      const resRooms = await getRooms();
      setRooms(resRooms);
      const resFriends = await getMyFriends();
      setFriends(resFriends || []);
    })();
  }, [authContext.user]);

  const handleCreateRoom = async (params: RoomCreateParams) => {
    try {
      await createRoom(params);
      const resRooms = await getRooms();
      setRooms(resRooms);
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
        <title>Rooms</title>
      </Head>
      <RoomsTemplate
        rooms={rooms}
        friends={friends}
        onCreateRoom={handleCreateRoom}
        onSearchFriend={handleSearchFriend}
      />
    </>
  );
}
