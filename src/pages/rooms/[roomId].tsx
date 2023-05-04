import { sendMessage } from '@/firebase/messages';
import { onSnapshotMessages } from '@/firebase/onSnapshotMessages';
import { deleteRoom, getRoom, updateRoom } from '@/firebase/rooms';
import { RoomTemplate } from '@/templates/RoomTemplate';
import { Message, Room, RoomUpdateParams, UserBase } from '@/models/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@/context/auth';
import { Unsubscribe } from 'firebase/firestore';
import { deleteFile } from '@/firebase/storage';
import { getMyFriends } from '@/firebase/users';

export default function Room() {
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const [room, setRoom] = useState<Room>();
  const [friends, setFriends] = useState<UserBase[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const authContext = useContext(AuthContext);
  /* ルームに招待されていないフレンド一覧 */
  const noInvitedFriends = useMemo(
    () => friends.filter((friend) => !room?.userIds.includes(friend.id)),
    [friends, room],
  );

  useEffect(() => {
    if (!roomId || !authContext.user) return;

    let unsubscribe: Unsubscribe;
    /* メッセージ一覧の取得と監視 */
    try {
      unsubscribe = onSnapshotMessages(roomId, (messages) => {
        setMessages(messages);
      });
    } catch (error) {
      console.error(error);
    }

    /* ルーム情報とフレンド一覧の取得 */
    (async () => {
      try {
        const resRoom = await getRoom(roomId);
        setRoom(resRoom);
        const resFriends = await getMyFriends();
        setFriends(resFriends);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      /* 監視の終了 */
      unsubscribe();
    };
  }, [roomId, authContext.user]);

  /* メッセージの送信 */
  const handleOnSendMessage = (content: string) => {
    try {
      sendMessage({ roomId, content });
    } catch (error) {
      console.error(error);
    }
  };

  /* ルーム情報の更新 */
  const handleOnUpdateRoom = async (params: RoomUpdateParams) => {
    try {
      await updateRoom(params);
      if (room?.thumbnailUrl && params.thumbnailImage) {
        await deleteFile(room.thumbnailUrl);
      }

      /* 再取得 */
      const response = await getRoom(roomId);
      setRoom(response);
    } catch (error) {
      console.error(error);
    }
  };

  /* ルームの削除 */
  const handleOnDeleteRoom = async () => {
    try {
      await deleteRoom(roomId);
      await router.push('/rooms');
    } catch (error) {
      console.error(error);
    }
  };

  /* ルームへ招待 */
  const handleOnInviteUsers = async (userIds: string[]) => {
    if (!room) return;
    try {
      await updateRoom({
        roomId,
        name: room.name,
        userIds: [...room.userIds, ...userIds],
        thumbnailImage: null,
      });
      const resRoom = await getRoom(roomId);
      setRoom(resRoom);
    } catch (error) {
      console.error(error);
    }
  };

  /* ルームを退室 */
  const handleOnLeaveRoom = async () => {
    if (!room) return;

    try {
      await updateRoom({
        roomId,
        name: room.name,
        userIds: room.userIds.filter((id) => id !== authContext.user?.uid),
        thumbnailImage: null,
      });
      await router.push('/rooms');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>{room?.name} | トープ</title>
      </Head>
      {room && (
        <RoomTemplate
          room={room}
          friends={noInvitedFriends}
          messages={messages}
          onSendMessage={handleOnSendMessage}
          onUpdateRoom={handleOnUpdateRoom}
          onDeleteRoom={handleOnDeleteRoom}
          onInviteUsers={handleOnInviteUsers}
          onLeaveRoom={handleOnLeaveRoom}
        />
      )}
    </>
  );
}
