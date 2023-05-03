import { FC } from 'react';
import styles from './Header.module.css';
import Title from 'public/app_title.svg';
import Logo from 'public/app_logo.svg';
import Link from 'next/link';

type Props = {};

export const Header: FC<Props> = () => {
  return (
    <header className={styles.root}>
      <Link href='/'>
        <Logo />
        <Title />
      </Link>
    </header>
  );
};
