import { FC, ReactNode } from 'react';
import { Header } from '@/components/Header';
import { FooterMenu } from '@/components/FooterMenu';
import styles from './Layout.module.css';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  isLogin: boolean;
};

export const Layout: FC<Props> = ({ children, isLogin }) => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      {router.pathname !== '/rooms/[roomId]' && <Header />}
      <main className={styles.main}>{children}</main>
      {isLogin && <FooterMenu />}
    </div>
  );
};
