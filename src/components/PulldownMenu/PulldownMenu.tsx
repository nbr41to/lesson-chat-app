import { FC, ReactNode } from 'react';
import styles from './PulldownMenu.module.css';

type Props = {
  data: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }[];
};

export const PulldownMenu: FC<Props> = ({ data }) => {
  return (
    <div className={styles.root}>
      {data.map((item, index) => (
        <div key={index} className={styles.item} onClick={item.onClick}>
          {item.icon}
          <div className={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};
