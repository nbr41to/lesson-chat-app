import { FC } from 'react';
import styles from './Header.module.css';
import Title from 'public/app_title.svg';

type Props = {};

export const Header: FC<Props> = () => {
  return (
    <header className={styles.root}>
      <Title />
    </header>
  );
};
