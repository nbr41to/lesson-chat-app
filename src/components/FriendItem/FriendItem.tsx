import { FC } from 'react';
import { Avatar } from '@/components/Avatar';
import styles from './FriendItem.module.css';

type Props = {
  avatarUrl: string;
  name: string;
};

export const FriendItem: FC<Props> = ({ avatarUrl, name }) => {
  return (
    <div className={styles.root}>
      <Avatar url={avatarUrl} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};
