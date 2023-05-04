import { FC, useState } from 'react';
import { Message, Room, RoomUpdateParams } from '@/models/types';
import { ChatBubble } from '@/components/ChatBubble';
import { MessageTextArea } from '@/components/MessageTextArea';
import { getCurrentUser } from '@/firebase/authentication';
import { PencilIcon, UsersThreeIcon } from '@/components/icons';
import { NestedPageHeader } from '@/components/NestedPageHeader';
import { Drawer } from '@/components/Drawer';
import { RoomEditForm } from '@/components/RoomEditForm';
import { RoomMembers } from '@/components/RoomMembers';
import styles from './RoomTemplate.module.css';
import { useRouter } from 'next/router';

type Props = {
  room: Room;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onUpdateRoom: (params: RoomUpdateParams) => Promise<void>;
  onDeleteRoom: () => Promise<void>;
  onLeaveRoom: () => Promise<void>;
};

export const RoomTemplate: FC<Props> = ({
  room,
  messages,
  onSendMessage,
  onUpdateRoom,
  onDeleteRoom,
  onLeaveRoom,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isMemberSetting, setIsMemberSetting] = useState(false);
  const [messageText, setMessageText] = useState('');
  const currentUser = getCurrentUser();

  const handleOnSendMessage = () => {
    onSendMessage(messageText);
    setMessageText('');
  };

  const handleOnUpdateRoom = (params: RoomUpdateParams) => {
    onUpdateRoom(params);
    setIsEditing(false);
  };
  const handleOnDeleteRoom = () => {
    onDeleteRoom();
    setIsEditing(false);
  };

  return (
    <>
      <NestedPageHeader
        title={room.name}
        menuItems={[
          {
            icon: <UsersThreeIcon />,
            label: 'メンバー',
            onClick: () => setIsMemberSetting(true),
          },
          {
            icon: <PencilIcon />,
            label: 'ルーム編集',
            onClick: () => setIsEditing(true),
          },
        ]}
        onBack={() => router.push('/rooms')}
      />
      <div className={styles.root}>
        <div className={styles.messageList}>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              isOwn={currentUser?.uid === message.userId}
              name={
                room.users.find((user) => user.id === message.userId)?.name ||
                ''
              }
              iconUrl={
                room.users.find((user) => user.id === message.userId)
                  ?.avatarUrl || ''
              }
            />
          ))}
        </div>

        <div>
          <MessageTextArea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button onClick={handleOnSendMessage}>送信</button>
        </div>
      </div>

      <Drawer
        title='ルーム編集'
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      >
        <RoomEditForm
          room={room}
          onUpdate={handleOnUpdateRoom}
          onDelete={handleOnDeleteRoom}
        />
      </Drawer>
      <Drawer
        title='メンバー'
        isOpen={isMemberSetting}
        onClose={() => setIsMemberSetting(false)}
      >
        <RoomMembers room={room} onLeave={onLeaveRoom} />
      </Drawer>
    </>
  );
};
