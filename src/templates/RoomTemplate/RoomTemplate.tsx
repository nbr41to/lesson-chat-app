import { FC, useState } from 'react';
import { Message, Room } from '@/types';
import styles from './RoomTemplate.module.css';
import { ChatBubble } from '@/components/ChatBubble';
import { MessageInput } from '@/components/MessageInput';
import { RoomHeader } from '@/components/RoomHeader';
import { getCurrentUser } from '@/firebase/authentication';

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
  const [messageText, setMessageText] = useState('');
  const currentUser = getCurrentUser();

  const handleCreateMessage = () => {
    onCreateMessage(messageText);
    setMessageText('');
  };

  return (
    <div className={styles.root}>
      <RoomHeader name={room.name} amount={2} />

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
