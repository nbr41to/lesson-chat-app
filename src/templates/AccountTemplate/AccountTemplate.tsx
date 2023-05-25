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
import { SearchFriendForm } from '@/components/SearchFriendForm';
import { PulldownMenu } from '@/components/PulldownMenu';

type Props = {
  user: User;
  friends: User[];
  onUpdate: (params: UserUpdateParams) => void;
  onSearchFriend: (friendId: string) => void;
};

export const AccountTemplate: FC<Props> = ({
  user,
  friends,
  onUpdate,
  onSearchFriend,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const copyPublicId = () => {
    navigator.clipboard.writeText(user.publicId);
  };

  const handleOnUpdate = (params: UserUpdateParams) => {
    onUpdate(params);
    setIsEditing(false);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.pageHeader}>
          <h2>プロフィール</h2>
          <PulldownMenu
            buttonIcon={<SettingIcon />}
            data={[
              {
                icon: <SettingIcon />,
                label: 'セキュリティ',
                onClick: () => {},
              },
              {
                icon: <SettingIcon />,
                label: 'アカウント消去',
                onClick: () => {},
              },
              {
                icon: <SettingIcon />,
                label: 'ログアウト',
                onClick: () => {},
              },
            ]}
          />
        </div>
        <div className={styles.profileWrapper}>
          <Avatar size='large' url={user.avatarUrl} />
          <div className={styles.profile}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.publicId}>
              <span>ID：{user.publicId}</span>
              <IconButton icon={<CopyIcon />} onClick={copyPublicId} />
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
          onClick={() => setIsSearching(true)}
        />
        <div className={styles.friends}>
          <h2>フレンド({friends.length})</h2>
          <div className={styles.friendsItems}>
            {friends.map((friend) => (
              <FriendItem key={friend.id} user={friend} />
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
          user={user}
          onSubmit={handleOnUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </Drawer>
      <Drawer
        title='フレンド検索'
        isOpen={isSearching}
        onClose={() => setIsSearching(false)}
      >
        <SearchFriendForm
          onSubmit={onSearchFriend}
          onCancel={() => setIsSearching(false)}
        />
      </Drawer>
    </>
  );
};
