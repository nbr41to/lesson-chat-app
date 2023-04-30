import { getCurrentUser } from '@/firebase/authentication';
import { addMessage, getMessages } from '@/firebase/messages';
import { getRoom } from '@/firebase/rooms';
import { RoomTemplate } from '@/templates/RoomTemplate';
import { Message, Room } from '@/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Room() {
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const [room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!roomId) return;
    (async () => {
      const responseMessages = await getMessages(roomId);
      const responseRoom = await getRoom(roomId);
      setMessages(responseMessages);
      setRoom(responseRoom);
    })();
  }, [roomId]);

  const handleCreateMessage = (content: string) => {
    addMessage({ roomId, content });
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
        />
      )}
    </>
  );
}
