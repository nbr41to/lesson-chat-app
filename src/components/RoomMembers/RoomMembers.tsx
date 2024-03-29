import { FC, useState } from 'react';
import { Room, User } from '@/models/types';

import { Avatar } from '@/components/Avatar';
import { PlusIcon } from '@/icons';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import styles from './RoomMembers.module.css';
import { ConfirmModal } from '@/components/ConfirmModal';
import { baseUrl } from '@/models/constants';
import { Drawer } from '@/components/Drawer';
import { MultiSelectFriend } from '@/components/MultiSelectFriend';

type Props = {
  room: Room;
  friends: User[];
  onInvite: (userIds: string[]) => void;
  onLeave: () => void;
};

export const RoomMembers: FC<Props> = ({
  room,
  friends,
  onInvite,
  onLeave,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState<boolean>(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const roomUrl = `${baseUrl}/join-room/${room.id}`;

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomUrl);
  };

  const handleOnToggleSelectUserIds = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const handleOnInvite = () => {
    onInvite(selectedUserIds);
    setIsInviteDrawerOpen(false);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.userItems}>
          {room.users.map((member) => (
            <Avatar key={member.id} url={member.avatarUrl} name={member.name} />
          ))}
          <IconButton
            icon={<PlusIcon />}
            width={48}
            height={48}
            onClick={() => setIsInviteDrawerOpen(true)}
          />
        </div>

        <div className={styles.copyLink}>
          <p>ルームのリンク：{roomUrl}</p>
          <Button label='ルームのリンクをコピー' onClick={copyRoomLink} />
        </div>
        <Button
          variant='secondary'
          label='ルームを退室'
          onClick={() => setIsConfirmModalOpen(true)}
        />
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message='本当にルームを退室しますか？'
        primaryLabel='退室'
        onClickPrimary={onLeave}
        secondaryLabel='キャンセル'
        onClickSecondary={() => setIsConfirmModalOpen(false)}
        onClose={() => setIsConfirmModalOpen(false)}
      />
      <Drawer
        title='メンバーの追加'
        isOpen={isInviteDrawerOpen}
        onClose={() => setIsInviteDrawerOpen(false)}
      >
        <div className={styles.inviteDrawerContent}>
          <MultiSelectFriend
            friends={friends}
            selectedIds={selectedUserIds}
            onToggle={handleOnToggleSelectUserIds}
          />
          <Button label='招待する' onClick={handleOnInvite} />
        </div>
      </Drawer>
    </>
  );
};
