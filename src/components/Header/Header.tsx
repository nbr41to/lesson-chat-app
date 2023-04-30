import { FC } from 'react';
import styles from './Header.module.css';
import Title from 'public/app_title.svg';
import Logo from 'public/app_logo.svg';

type Props = {};

export const Header: FC<Props> = () => {
  return (
    <header className={styles.root}>
      <Logo />
      <Title />
    </header>
  );
};
