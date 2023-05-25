import { FC } from 'react';
import { Avatar } from '@/components/Avatar';
import styles from './FriendItem.module.css';
import { User } from '@/models/types';

type Props = {
  user: User;
};

export const FriendItem: FC<Props> = ({ user }) => {
  const { avatarUrl, name } = user;

  return (
    <div className={styles.root}>
      <Avatar url={avatarUrl} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};
