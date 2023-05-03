import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Room, RoomUpdateParams } from '@/models/types';
import { deleteRoom, getRoom, updateRoom } from '@/firebase/rooms';
import { RoomSettingTemplate } from '@/templates/RoomSettingTemplate';
import { useRouter } from 'next/router';

export default function RoomSetting() {
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

  const handleUpdateRoom = async (params: RoomUpdateParams) => {
    try {
      await updateRoom(params);
      router.push(`/rooms/${roomId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom(roomId);
      router.push('/rooms');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Rooms Setting</title>
      </Head>
      {room && (
        <RoomSettingTemplate
          room={room}
          onUpdate={handleUpdateRoom}
          onDelete={handleDeleteRoom}
        />
      )}
    </>
  );
}
