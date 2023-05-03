import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Room } from '@/types';
import { getRoom } from '@/firebase/rooms';
import { RoomSettingTemplate } from '@/templates/RoomSettingTemplate';
import { useRouter } from 'next/router';

export default function Rooms() {
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
        <title>Rooms Setting</title>
      </Head>
      {room && <RoomSettingTemplate room={room} />}
    </>
  );
}
