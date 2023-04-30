import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Message, Room } from '@/types';
import styles from './RoomTemplate.module.css';
import { ChatBubble } from '@/components/ChatBubble';
import { MessageInput } from '@/components/MessageInput';

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
  const [openMenu, setOpenMenu] = useState(false);
  console.log(messages);

  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}></div>

      <div className={styles.messageList}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message.content} isOwn={true} />
        ))}
      </div>

      <div>
        <MessageInput
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={() => onCreateMessage(messageText)}>送信</button>
      </div>
    </div>
  );
};
