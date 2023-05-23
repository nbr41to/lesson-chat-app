import { FC } from 'react';
import { User } from '@/models/types';

import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './AddFriendTemplate.module.css';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';

type Props = {
  user: User | undefined;
  onAddFriend: () => Promise<void>;
  isAdded: boolean;
};

export const AddFriendTemplate: FC<Props> = ({
  user,
  onAddFriend,
  isAdded,
}) => {
  return (
    <>
      <NestedPageHeader title='フレンド追加' />
      {user ? (
        <div className={styles.root}>
          <div className={styles.icon}>
            <Avatar size='large' name={user.name} url={user.avatarUrl} />
          </div>

          <div className={styles.buttonWrapper}>
            <Button
              label={isAdded ? 'フレンド追加済' : 'フレンド追加'}
              variant={isAdded ? 'secondary' : 'primary'}
              disabled={isAdded}
              onClick={onAddFriend}
            />
          </div>
        </div>
      ) : (
        <p className={styles.notFoundMessage}>このユーザは存在しません</p>
      )}
    </>
  );
};
