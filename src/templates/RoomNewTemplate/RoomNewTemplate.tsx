import { FC, useRef, useState } from 'react';

import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './RoomNewTemplate.module.css';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/IconButton';
import { PlusIcon } from '@/components/icons';
import { uploadRoomThumbnailFile } from '@/firebase/storage';
import { useRouter } from 'next/router';
import { Avatar } from '@/components/Avatar';
import { createRoom } from '@/firebase/rooms';

type Props = {};

export const RoomNewTemplate: FC<Props> = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file || !name) return;
    await createRoom({
      name,
      file,
      userIds: ['paPVFUZHApbygZz2VW7mm2FprQl2'], // mockとして初期値を設定
    });
    router.push('/rooms');
  };

  return (
    <div className={styles.root}>
      <NestedPageHeader name='ルーム作成' />

      <div className={styles.pageBody}>
        <div className={styles.icon}>
          <IconButton
            icon={
              file ? (
                <Avatar url={URL.createObjectURL(file)} size='large' />
              ) : (
                <PlusIcon />
              )
            }
            width={72}
            height={72}
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
            }}
          />
          <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleFileChange}
            hidden
          />
        </div>

        <Input
          label='ルーム名'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.submitButtonWrapper}>
          <Button label='作成' onClick={handleSubmit} />
        </div>
        <div className={styles.deleteButtonWrapper}>
          <Button
            variant='secondary'
            label='キャンセル'
            onClick={router.back}
          />
        </div>
      </div>
    </div>
  );
};
