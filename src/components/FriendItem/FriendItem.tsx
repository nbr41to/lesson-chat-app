import { FC } from 'react';
import { Avatar } from '@/components/Avatar';
import styles from './FriendItem.module.css';

type Props = {
  thumbnailUrl: string;
  name: string;
};

export const FriendItem: FC<Props> = ({ thumbnailUrl, name }) => {
  return (
    <div className={styles.root}>
      <Avatar url={thumbnailUrl} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};
