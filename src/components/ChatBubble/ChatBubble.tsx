import { FC } from 'react';
import styles from './ChatBubble.module.css';
import { Avatar } from '@/components/Avatar';

type Props = {
  message: string;
  isOwn: boolean;
  iconUrl?: string;
  name?: string;
};

export const ChatBubble: FC<Props> = ({
  message,
  isOwn,
  iconUrl = '',
  name,
}) => {
  const bubbleDirection = isOwn ? styles.rightBubble : styles.leftBubble;

  return (
    <div className={styles.root}>
      {!isOwn && (
        <div className={styles.avatar}>
          <Avatar url={iconUrl} name={name} size='small' />
        </div>
      )}
      <p className={`${styles.bubble} ${bubbleDirection}`}>{message}</p>
    </div>
  );
};
