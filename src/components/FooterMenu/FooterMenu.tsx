import { FC, useState } from 'react';
import styles from './FooterMenu.module.css';

import { useRouter } from 'next/router';
import { IconButton } from '@/components/IconButton';
import {
  ChatTeardropDotsActiveIcon,
  ChatTeardropDotsIcon,
  SignOutIcon,
  UserCircleActiveIcon,
  UserCircleIcon,
} from '@/components/icons';
import { login, logout } from '@/firebase/authentication';
import { ConfirmModal } from '@/components/ConfirmModal';

type Props = {};

export const FooterMenu: FC<Props> = () => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <footer className={styles.root}>
      <IconButton
        icon={
          router.pathname === '/account' ? (
            <UserCircleActiveIcon />
          ) : (
            <UserCircleIcon />
          )
        }
        onClick={() => router.push('/account')}
      />
      <IconButton
        icon={
          router.pathname.includes('/rooms') ? (
            <ChatTeardropDotsActiveIcon />
          ) : (
            <ChatTeardropDotsIcon />
          )
        }
        onClick={() => router.push('/rooms')}
      />
      <IconButton
        icon={<SignOutIcon />}
        onClick={() => setIsConfirmModalOpen(true)}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        primaryLabel='ログアウト'
        secondaryLabel='キャンセル'
        onClickPrimary={logout}
        onClickSecondary={() => setIsConfirmModalOpen(false)}
        message='ログアウトしますか？'
      />
    </footer>
  );
};
