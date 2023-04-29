import { FC } from 'react';
import styles from './Header.module.css';

type Props = {};

export const Header: FC<Props> = () => {
  return <header className={styles.root}>トープ</header>;
};
