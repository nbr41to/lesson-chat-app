import { FC, ReactNode } from 'react';
import { Header } from '@/components/Header';
import { FooterMenu } from '@/components/FooterMenu';
import styles from './Layout.module.css';

type Props = {
  children: ReactNode;
  isLogin: boolean;
};

export const Layout: FC<Props> = ({ children, isLogin }) => {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>{children}</main>
      {isLogin && <FooterMenu />}
    </div>
  );
};
