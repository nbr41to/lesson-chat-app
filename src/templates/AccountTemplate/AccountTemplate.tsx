import { FC, useState } from 'react';
import styles from './AccountTemplate.module.css';

import { CopyIcon, SettingIcon, UserPlusBlackIcon } from '@/components/icons';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { User, UserUpdateParams } from '@/models/types';
import { FriendItem } from '@/components/FriendItem';
import { IconButton } from '@/components/IconButton';
import { Drawer } from '@/components/Drawer';
import { AccountEditForm } from '@/components/AccountEditForm';

type Props = {
  user: User;
  friends: User[];
  onUpdate: (params: UserUpdateParams) => Promise<void>;
};

export const AccountTemplate: FC<Props> = ({ user, friends, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCopyPublicId = () => {
    navigator.clipboard.writeText(user.publicId);
  };

  const handleUpdate = async (params: UserUpdateParams) => {
    try {
      await onUpdate(params);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.pageHeader}>
          <h2>プロフィール</h2>
          <IconButton icon={<SettingIcon />} onClick={() => {}} />
        </div>

        <div className={styles.profileWrapper}>
          <Avatar size='large' url={user.avatarUrl} />
          <div className={styles.profile}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.publicId}>
              <span>ID：{user.publicId}</span>
              <IconButton icon={<CopyIcon />} onClick={handleCopyPublicId} />
            </div>
          </div>
          <Button
            size='small'
            label='編集'
            onClick={() => setIsEditing(true)}
          />
        </div>

        <Button
          variant='secondary'
          size='large'
          label='フレンド追加'
          leftIcon={<UserPlusBlackIcon />}
          onClick={() => {}}
        />

        <div className={styles.friends}>
          <h2>フレンド({friends.length})</h2>
          <div className={styles.friendsItems}>
            {friends.map((friend) => (
              <FriendItem
                key={friend.id}
                name={friend.name}
                avatarUrl={friend.avatarUrl}
              />
            ))}
          </div>
        </div>
      </div>

      <Drawer
        title='プロフィール編集'
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      >
        <AccountEditForm
          name={user.name}
          publicId={user.publicId}
          avatarUrl={user.avatarUrl}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </Drawer>
    </>
  );
};
