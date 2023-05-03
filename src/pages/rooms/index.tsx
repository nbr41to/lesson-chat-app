import Head from 'next/head';
import { useEffect, useState } from 'react';
import { RoomListItem } from '@/models/types';
import { getRooms } from '@/firebase/rooms';
import { RoomsTemplate } from '@/templates/RoomsTemplate';

export default function Rooms() {
  const [rooms, setRooms] = useState<RoomListItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getRooms();
      console.log(response);
      setRooms(response);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Rooms</title>
      </Head>
      <RoomsTemplate rooms={rooms} />
    </>
  );
}
