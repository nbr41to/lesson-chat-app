import { ChangeEvent, FC, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/IconButton';
import { Avatar } from '@/components/Avatar';
import styles from './AccountEditForm.module.css';
import { User, UserUpdateParams } from '@/models/types';

type Props = {
  user: User;
  onSubmit: (params: UserUpdateParams) => void;
  onCancel: () => void;
};

export const AccountEditForm: FC<Props> = ({ user, onSubmit, onCancel }) => {
  const {
    name: initialName,
    publicId: initialPublicId,
    avatarUrl: initialAvatarUrl,
  } = user;
  const [name, setName] = useState(initialName);
  const [publicId, setPublicId] = useState(initialPublicId);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleOnSubmit = async () => {
    if (!file && !name && !publicId) return;
    onSubmit({
      name,
      publicId,
      avatarImage: file,
    });
    setName(initialName);
    setPublicId(initialPublicId);
    setFile(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <IconButton
          icon={
            <Avatar
              url={file ? URL.createObjectURL(file) : initialAvatarUrl}
              size='large'
            />
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
          data-testid='file-input'
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={handleOnChangeFile}
          hidden
        />
      </div>

      <Input
        label='ユーザー名'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label='ID'
        value={publicId}
        onChange={(e) => setPublicId(e.target.value)}
      />
      <div className={styles.submitButtonWrapper}>
        <Button label='保存' onClick={handleOnSubmit} />
      </div>
      <div className={styles.deleteButtonWrapper}>
        <Button variant='secondary' label='キャンセル' onClick={onCancel} />
      </div>
    </div>
  );
};
