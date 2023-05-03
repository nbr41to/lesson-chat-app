import { FC, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import styles from './SearchFriendForm.module.css';

type Props = {
  onSubmit: (friendId: string) => Promise<void>;
  onCancel: () => void;
};

export const SearchFriendForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const [friendId, setFriendId] = useState<string>('');

  const handleSubmit = async () => {
    if (!friendId) return;
    await onSubmit(friendId);
  };

  return (
    <div className={styles.root}>
      <Input
        label='ID'
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
      />
      <div className={styles.submitButtonWrapper}>
        <Button label='検索' onClick={handleSubmit} />
      </div>
      <div className={styles.deleteButtonWrapper}>
        <Button variant='secondary' label='キャンセル' onClick={onCancel} />
      </div>
    </div>
  );
};
