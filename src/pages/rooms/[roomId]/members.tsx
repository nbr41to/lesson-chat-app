import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Room } from '@/models/types';
import { getRoom } from '@/firebase/rooms';
import { RoomMemberTemplate } from '@/templates/RoomMemberTemplate';
import { useRouter } from 'next/router';

export default function RoomMember() {
  const router = useRouter();
  const roomId = router.query.roomId as string;

  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    if (!roomId) return;

    (async () => {
      const responseRoom = await getRoom(roomId);
      setRoom(responseRoom);
    })();
  }, [roomId]);

  return (
    <>
      <Head>
        <title>Room Member</title>
      </Head>
      {room && <RoomMemberTemplate room={room} />}
    </>
  );
}
