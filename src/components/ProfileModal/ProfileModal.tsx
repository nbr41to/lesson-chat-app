import { FC } from 'react';
import { Button } from '@/components/Button';
import { User } from '@/models/types';
import { Avatar } from '@/components/Avatar';
import styles from './ProfileModal.module.css';

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onChatStart: (friendId: string) => void;
  onDelete: (friendId: string) => void;
};

export const ProfileModal: FC<Props> = ({
  user,
  isOpen,
  onClose,
  onChatStart,
  onDelete,
}) => {
  return (
    <>
      {isOpen ? (
        <div className={styles.root}>
          {/* Overlay */}
          <div className={styles.overlay} onClick={onClose} />
          <div className={styles.content}>
            <Avatar url={user.avatarUrl} size='large' />
            <p>{user.name}</p>
            <div className={styles.buttonWrapper}>
              <Button
                variant='secondary'
                size='medium'
                label='チャットする'
                onClick={() => onChatStart(user.id)}
              />
              <Button
                variant='primary'
                size='medium'
                label='消去'
                onClick={() => onDelete(user.id)}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
