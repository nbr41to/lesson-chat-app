import { FC, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { FooterMenu } from '@/components/FooterMenu';
import styles from './Layout.module.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  isLogin: boolean;
};

export const Layout: FC<Props> = ({ children, isLogin }) => {
  return (
    <div className={`${styles.root} ${inter.className}`}>
      <Header />
      <main className={styles.main}>{children}</main>
      {isLogin && <FooterMenu />}
    </div>
  );
};
