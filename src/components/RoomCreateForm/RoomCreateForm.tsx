import { ChangeEvent, FC, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/IconButton';
import { PlusIcon } from '@/components/icons';
import { useRouter } from 'next/router';
import { Avatar } from '@/components/Avatar';
import { RoomCreateParams, User } from '@/models/types';
import styles from './RoomCreateForm.module.css';

type Props = {
  friends: User[];
  onSubmit: (params: RoomCreateParams) => Promise<void>;
};

export const RoomCreateForm: FC<Props> = ({ friends, onSubmit }) => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!name || !file) return;
    try {
      await onSubmit({
        name,
        file,
        userIds: ['paPVFUZHApbygZz2VW7mm2FprQl2'], // mockとして初期値を設定
      });
      setName('');
      setFile(null);
      router.push('/rooms');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.root}>
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
        <Button variant='secondary' label='キャンセル' onClick={router.back} />
      </div>
    </div>
  );
};
