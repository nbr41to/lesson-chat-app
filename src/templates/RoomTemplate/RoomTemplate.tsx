import { FC, useState } from 'react';
import { Message, Room, RoomUpdateParams } from '@/models/types';
import { ChatBubble } from '@/components/ChatBubble';
import { MessageInput } from '@/components/MessageInput';
import { getCurrentUser } from '@/firebase/authentication';
import { PencilIcon, UsersThreeIcon } from '@/components/icons';
import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './RoomTemplate.module.css';
import { useRouter } from 'next/router';
import { Drawer } from '@/components/Drawer';
import { RoomEditForm } from '@/components/RoomEditForm';
import { RoomMembers } from '@/components/RoomMembers';

type Props = {
  room: Room;
  messages: Message[];
  onCreateMessage: (content: string) => void;
  onUpdateRoom: (params: RoomUpdateParams) => Promise<void>;
  onDeleteRoom: () => Promise<void>;
};

export const RoomTemplate: FC<Props> = ({
  room,
  messages,
  onCreateMessage,
  onUpdateRoom,
  onDeleteRoom,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isMemberSetting, setIsMemberSetting] = useState(false);
  const [messageText, setMessageText] = useState('');
  const currentUser = getCurrentUser();

  const handleCreateMessage = () => {
    onCreateMessage(messageText);
    setMessageText('');
  };

  const handleUpdateRoom = async (params: RoomUpdateParams) => {
    await onUpdateRoom(params);
    setIsEditing(false);
  };
  const handleDeleteRoom = async () => {
    await onDeleteRoom();
    setIsEditing(false);
  };

  return (
    <>
      <div className={styles.root}>
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
        />

        <div className={styles.pageBody}>
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
            <MessageInput
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button onClick={handleCreateMessage}>送信</button>
          </div>
        </div>
      </div>

      <Drawer
        title='ルーム編集'
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      >
        <RoomEditForm
          room={room}
          onUpdate={handleUpdateRoom}
          onDelete={handleDeleteRoom}
        />
      </Drawer>
      <Drawer
        title='メンバー'
        isOpen={isMemberSetting}
        onClose={() => setIsMemberSetting(false)}
      >
        <RoomMembers room={room} />
      </Drawer>
    </>
  );
};
