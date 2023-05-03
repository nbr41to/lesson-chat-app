import { ChangeEvent, FC, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/IconButton';
import { Avatar } from '@/components/Avatar';
import styles from './AccountEditForm.module.css';
import { UserUpdateParams } from '@/models/types';

type Props = {
  name: string;
  publicId: string;
  avatarUrl: string;
  onSubmit: (params: UserUpdateParams) => Promise<void>;
  onCancel: () => void;
};

export const AccountEditForm: FC<Props> = ({
  name: initialName,
  publicId: initialPublicId,
  avatarUrl: initialAvatarUrl,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(initialName);
  const [publicId, setPublicId] = useState(initialPublicId);
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
    if (!file && !name && !publicId) return;
    await onSubmit({
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
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={handleFileChange}
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
        <Button label='保存' onClick={handleSubmit} />
      </div>
      <div className={styles.deleteButtonWrapper}>
        <Button variant='secondary' label='キャンセル' onClick={onCancel} />
      </div>
    </div>
  );
};
