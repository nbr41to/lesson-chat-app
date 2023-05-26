import { FC } from 'react';
import styles from './FooterMenu.module.css';

import { useRouter } from 'next/router';
import { IconButton } from '@/components/IconButton';
import {
  ChatTeardropDotsActiveIcon,
  ChatTeardropDotsIcon,
  UserCircleActiveIcon,
  UserCircleIcon,
} from '@/components/icons';

type Props = {};

export const FooterMenu: FC<Props> = () => {
  const router = useRouter();

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
    </footer>
  );
};
