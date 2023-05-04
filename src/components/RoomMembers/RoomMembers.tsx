import { FC, useState } from 'react';
import { Room } from '@/models/types';

import { Avatar } from '@/components/Avatar';
import { PlusIcon } from '@/components/icons';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import styles from './RoomMembers.module.css';
import { ConfirmModal } from '@/components/ConfirmModal';
import { baseUrl } from '@/models/constants';

type Props = {
  room: Room;
  onLeave: () => void;
};

export const RoomMembers: FC<Props> = ({ room, onLeave }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const roomUrl = `${baseUrl}/join-room/${room.id}`;
  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomUrl);
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
            onClick={() => {}}
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
    </>
  );
};
