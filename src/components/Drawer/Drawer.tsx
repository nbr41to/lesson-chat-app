import { FC, ReactNode } from 'react';
import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './Drawer.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  menuItems?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }[];
  children: string | ReactNode;
};

export const Drawer: FC<Props> = ({
  isOpen,
  onClose,
  title,
  menuItems,
  children,
}) => {
  return (
    <>
      <div className={`${styles.root} ${isOpen ? styles.open : styles.close}`}>
        <NestedPageHeader
          title={title}
          menuItems={menuItems}
          onBack={onClose}
        />
        {isOpen ? <div className={styles.content}>{children}</div> : <></>}
      </div>
    </>
  );
};
