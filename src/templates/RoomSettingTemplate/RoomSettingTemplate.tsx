import { FC, useState } from 'react';
import { RoomBase, RoomUpdateParams } from '@/models/types';

import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './RoomSettingTemplate.module.css';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ConfirmModal } from '@/components/ConfirmModal';

type Props = {
  room: RoomBase;
  onUpdate: (params: RoomUpdateParams) => Promise<void>;
  onDelete: () => Promise<void>;
};

export const RoomSettingTemplate: FC<Props> = ({
  room,
  onUpdate,
  onDelete,
}) => {
  const [name, setName] = useState(room.name);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <>
      <div className={styles.root}>
        <NestedPageHeader title='ルーム編集' />

        <div className={styles.pageBody}>
          <div className={styles.icon}>
            <Avatar size='large' url={room.thumbnailUrl} />
          </div>

          <Input
            label='ルーム名'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.submitButtonWrapper}>
            <Button
              label='変更'
              onClick={() =>
                onUpdate({
                  roomId: room.id,
                  name,
                  userIds: room.userIds,
                })
              }
            />
          </div>
          <div className={styles.deleteButtonWrapper}>
            <Button
              variant='secondary'
              label='ルームを消去'
              onClick={() => setIsConfirmModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        primaryLabel='消去'
        secondaryLabel='キャンセル'
        onPrimary={onDelete}
        onSecondary={() => setIsConfirmModalOpen(false)}
        message={
          <p className={styles.confirmModalMessage}>
            ルームを消去すると トークの履歴は<span>すべて消去</span>されます。
            本当にルームを消去しますか？
          </p>
        }
      />
    </>
  );
};
