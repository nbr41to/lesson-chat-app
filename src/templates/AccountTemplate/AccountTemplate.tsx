import { FC, useState } from 'react';
import styles from './AccountTemplate.module.css';

import {
  CopyIcon,
  SettingIcon,
  SettingWhiteIcon,
  SignOutIcon,
  TrashIcon,
  UserPlusBlackIcon,
} from '@/components/icons';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { User, UserUpdateParams } from '@/models/types';
import { FriendItem } from '@/components/FriendItem';
import { IconButton } from '@/components/IconButton';
import { Drawer } from '@/components/Drawer';
import { AccountEditForm } from '@/components/AccountEditForm';
import { SearchFriendForm } from '@/components/SearchFriendForm';
import { PulldownMenu } from '@/components/PulldownMenu';
import { ProfileModal } from '@/components/ProfileModal';
import { ConfirmModal } from '@/components/ConfirmModal';

type Props = {
  user: User;
  friends: User[];
  onUpdate: (params: UserUpdateParams) => void;
  onSearchFriend: (friendId: string) => void;
  onChatStart: (friendId: string) => void;
  onDeleteMe: () => void;
  onDeleteFriend: (friendId: string) => void;
  onLogout: () => void;
};

export const AccountTemplate: FC<Props> = ({
  user,
  friends,
  onUpdate,
  onSearchFriend,
  onChatStart,
  onDeleteMe,
  onDeleteFriend,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLogoutConfirmModalOpen, setIsLogoutConfirmModalOpen] =
    useState(false);
  const [isDeleteMeConfirmModalOpen, setIsDeleteMeConfirmModalOpen] =
    useState(false);
  const [selectedFriend, setSelectedFriend] = useState<User>();
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
                icon: <SettingWhiteIcon />,
                label: 'アカウント設定',
                onClick: () => {},
              },
              {
                icon: <TrashIcon />,
                label: 'アカウント消去',
                onClick: () => setIsDeleteMeConfirmModalOpen(true),
              },
              {
                icon: <SignOutIcon />,
                label: 'ログアウト',
                onClick: () => setIsLogoutConfirmModalOpen(true),
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
              <FriendItem
                key={friend.id}
                user={friend}
                onClick={() => setSelectedFriend(friend)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedFriend && (
        <ProfileModal
          isOpen={!!selectedFriend}
          user={selectedFriend}
          onClose={() => setSelectedFriend(undefined)}
          onChatStart={onChatStart}
          onDelete={onDeleteFriend}
        />
      )}
      <ConfirmModal
        isOpen={isLogoutConfirmModalOpen}
        onClose={() => setIsLogoutConfirmModalOpen(false)}
        primaryLabel='ログアウト'
        secondaryLabel='キャンセル'
        onClickPrimary={onLogout}
        onClickSecondary={() => setIsLogoutConfirmModalOpen(false)}
        message='ログアウトしますか？'
      />
      <ConfirmModal
        isOpen={isDeleteMeConfirmModalOpen}
        onClose={() => setIsDeleteMeConfirmModalOpen(false)}
        primaryLabel='消去'
        secondaryLabel='キャンセル'
        onClickPrimary={onDeleteMe}
        onClickSecondary={() => setIsDeleteMeConfirmModalOpen(false)}
        message='アカウントを消去するとトープ内のデータがすべて消去されます。本当にアカウントを消去しますか？'
      />
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
