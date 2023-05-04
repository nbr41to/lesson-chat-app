import { Room } from '@/models/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@/context/auth';
import { getRoom, updateRoom } from '@/firebase/rooms';
import { JoinRoomTemplate } from '@/templates/JoinRoomTemplate';

export default function JoinRoom() {
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const [room, setRoom] = useState<Room>();
  const authContext = useContext(AuthContext);

  const isJoined = useMemo(() => {
    if (!room) return true;
    if (!authContext.user) return true;

    return room.userIds.includes(authContext.user.uid);
  }, [room, authContext.user]);

  useEffect(() => {
    if (!authContext.user || !roomId) return;

    (async () => {
      const response = await getRoom(roomId);
      setRoom(response);
    })();
  }, [roomId, authContext.user]);

  const handleOnJoinRoom = async () => {
    if (!room) return;
    if (isJoined) return;
    if (!authContext.user) return;

    try {
      await updateRoom({
        roomId: room.id,
        name: room.name,
        userIds: [...room.userIds, authContext.user.uid],
        thumbnailImage: null,
      });
      await router.push(`/rooms/${room.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>ルームへ参加 | トープ</title>
      </Head>
      <JoinRoomTemplate
        room={room}
        isJoined={isJoined}
        onJoinRoom={handleOnJoinRoom}
      />
    </>
  );
}
