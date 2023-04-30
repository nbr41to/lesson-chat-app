import { FC } from 'react';
import styles from './RoomItem.module.css';
import { Avatar } from '@/components/Avatar';
import { Room } from '@/types';

type Props = {
  room: Room;
  latestMessage: string;
  onClick: () => void;
};

export const RoomItem: FC<Props> = ({ room, latestMessage, onClick }) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <Avatar url={room.thumbnailUrl} />
      <div className={styles.container}>
        <p className={styles.name}>{room.name}</p>
        <p className={styles.latestMessage}>{latestMessage}</p>
      </div>
    </div>
  );
};
