import { FC } from 'react';
import styles from './RoomItem.module.css';
import { Avatar } from '@/components/Avatar';
import { Room, RoomListItem } from '@/models/types';

type Props = {
  room: RoomListItem;
  onClick: () => void;
};

export const RoomItem: FC<Props> = ({ room, onClick }) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <Avatar url={room.thumbnailUrl} />
      <div className={styles.container}>
        <p className={styles.name}>{room.name}</p>
        <p className={styles.latestMessage}>{room.latestMessage}</p>
      </div>
    </div>
  );
};
