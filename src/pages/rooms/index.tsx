import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Room } from '@/types';
import { createRoom, getRooms } from '@/firebase/rooms';
import { RoomsTemplate } from '@/templates/RoomsTemplate';

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getRooms();
      console.log(response);
      setRooms(response);
    })();
  }, []);

  const handleCreateRoom = () => {
    createRoom({
      name: 'New Room',
      thumbnailUrl: 'https://picsum.photos/100',
      userIds: ['paPVFUZHApbygZz2VW7mm2FprQl2'],
    });
  };

  return (
    <>
      <Head>
        <title>Rooms</title>
      </Head>
      <RoomsTemplate rooms={rooms} onCreateRoom={handleCreateRoom} />
    </>
  );
}
