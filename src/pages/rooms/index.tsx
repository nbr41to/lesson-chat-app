import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { RoomListItem } from '@/models/types';
import { getRooms } from '@/firebase/rooms';
import { RoomsTemplate } from '@/templates/RoomsTemplate';
import { AuthContext } from '@/context/auth';

export default function Rooms() {
  const [rooms, setRooms] = useState<RoomListItem[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.user) return;

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
