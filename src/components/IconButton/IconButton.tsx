import { FC, ReactNode } from 'react';
import styles from './IconButton.module.css';

type Props = {
  icon: ReactNode;
  onClick: () => void;
  width?: number;
  height?: number;
};

export const IconButton: FC<Props> = ({ icon, onClick, width, height }) => {
  return (
    <button
      className={styles.button}
      style={{ width: width, height: height }}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
