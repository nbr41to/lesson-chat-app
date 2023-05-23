import { ChangeEvent, FC, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/IconButton';
import { PlusIcon } from '@/components/icons';
import { useRouter } from 'next/router';
import { Avatar } from '@/components/Avatar';
import { RoomCreateParams, User } from '@/models/types';
import styles from './RoomCreateForm.module.css';
import { MultiSelectFriend } from '@/components/MultiSelectFriend';

type Props = {
  friends: User[];
  onSubmit: (params: RoomCreateParams) => void;
};

export const RoomCreateForm: FC<Props> = ({ friends, onSubmit }) => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleOnToggleFriendIds = (id: string) => {
    if (friendIds.includes(id)) {
      setFriendIds(friendIds.filter((friendId) => friendId !== id));
    } else {
      setFriendIds([...friendIds, id]);
    }
  };

  const handleOnSubmit = async () => {
    if (!name || !file) return;

    onSubmit({
      name,
      file,
      userIds: [...friendIds, 'paPVFUZHApbygZz2VW7mm2FprQl2'], // mockとしてテストユーザを追加
    });
    setName('');
    setFile(null);
    router.push('/rooms');
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
          data-testId='file-input'
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
        <Button label='作成' onClick={handleOnSubmit} />
      </div>
      <div className={styles.deleteButtonWrapper}>
        <Button variant='secondary' label='キャンセル' onClick={router.back} />
      </div>
      <div className={styles.selectFriends}>
        <p>メンバーを選択</p>
        <MultiSelectFriend
          friends={friends}
          selectedIds={friendIds}
          onToggle={handleOnToggleFriendIds}
        />
      </div>
    </div>
  );
};
