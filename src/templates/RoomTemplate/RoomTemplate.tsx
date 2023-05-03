import { FC, useState } from 'react';
import { Message, Room } from '@/models/types';
import { ChatBubble } from '@/components/ChatBubble';
import { MessageInput } from '@/components/MessageInput';
import { getCurrentUser } from '@/firebase/authentication';
import { PencilIcon, UsersThreeIcon } from '@/components/icons';
import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './RoomTemplate.module.css';
import { useRouter } from 'next/router';

type Props = {
  room: Room;
  messages: Message[];
  onCreateMessage: (content: string) => void;
};

export const RoomTemplate: FC<Props> = ({
  room,
  messages,
  onCreateMessage,
}) => {
  const router = useRouter();
  const [messageText, setMessageText] = useState('');
  const currentUser = getCurrentUser();

  const handleCreateMessage = () => {
    onCreateMessage(messageText);
    setMessageText('');
  };

  return (
    <div className={styles.root}>
      <NestedPageHeader
        title={room.name}
        menuItems={[
          {
            icon: <UsersThreeIcon />,
            label: 'メンバー',
            onClick: () => router.push(`/rooms/${room.id}/members`),
          },
          {
            icon: <PencilIcon />,
            label: 'ルーム編集',
            onClick: () => router.push(`/rooms/${room.id}/setting`),
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
  );
};
