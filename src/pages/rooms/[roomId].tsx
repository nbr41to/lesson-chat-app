import { addMessage } from '@/firebase/messages';
import { onSnapshotMessages } from '@/firebase/onSnapshotMessages';
import { deleteRoom, getRoom, updateRoom } from '@/firebase/rooms';
import { RoomTemplate } from '@/templates/RoomTemplate';
import { Message, Room, RoomUpdateParams } from '@/models/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth';

export default function Room() {
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const [room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState<Message[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!roomId || !authContext.user) return;

    const unsubscribe = onSnapshotMessages(roomId, (messages) => {
      setMessages(messages);
    });

    (async () => {
      const response = await getRoom(roomId);
      setRoom(response);
    })();

    return () => {
      unsubscribe();
    };
  }, [roomId, authContext.user]);

  const handleCreateMessage = (content: string) => {
    addMessage({ roomId, content });
  };

  const handleUpdateRoom = async (params: RoomUpdateParams) => {
    try {
      await updateRoom(params);
      const response = await getRoom(roomId);
      setRoom(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom(roomId);
      await router.push('/rooms');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Room</title>
      </Head>
      {room && (
        <RoomTemplate
          room={room}
          messages={messages}
          onCreateMessage={handleCreateMessage}
          onUpdateRoom={handleUpdateRoom}
          onDeleteRoom={handleDeleteRoom}
        />
      )}
    </>
  );
}
