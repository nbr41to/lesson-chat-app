import { ChangeEvent, FC, useRef, useState } from 'react';
import { RoomBase, RoomUpdateParams } from '@/models/types';

import styles from './RoomEditForm.module.css';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ConfirmModal } from '@/components/ConfirmModal';
import { IconButton } from '@/components/IconButton';

type Props = {
  room: RoomBase;
  onUpdate: (params: RoomUpdateParams) => void;
  onDelete: () => void;
};

export const RoomEditForm: FC<Props> = ({ room, onUpdate, onDelete }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [name, setName] = useState(room.name);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.icon}>
          <IconButton
            icon={
              <Avatar
                size='large'
                url={file ? URL.createObjectURL(file) : room.thumbnailUrl}
              />
            }
            onClick={() => inputRef.current?.click()}
          />
          <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleOnChangeFile}
            hidden
          />
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
                thumbnailImage: file,
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

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        primaryLabel='消去'
        secondaryLabel='キャンセル'
        onClickPrimary={onDelete}
        onClickSecondary={() => setIsConfirmModalOpen(false)}
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
