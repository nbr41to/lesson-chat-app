import { FC, ReactNode } from 'react';
import { ArrowDownIcon, DotsThreeIcon } from '@/components/icons';
import { PulldownMenu } from '@/components/PulldownMenu';
import { IconButton } from '@/components/IconButton';
import { useRouter } from 'next/router';
import styles from './NestedPageHeader.module.css';

type Props = {
  name: string;
  menuItems?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }[];
};

export const NestedPageHeader: FC<Props> = ({ name, menuItems }) => {
  const router = useRouter();

  return (
    <header className={styles.root}>
      <IconButton
        icon={<ArrowDownIcon />}
        width={18}
        height={18}
        onClick={router.back}
      />
      <div className={styles.name}>{name}</div>
      <div className={styles.menuButton}>
        {menuItems && (
          <PulldownMenu buttonIcon={<DotsThreeIcon />} data={menuItems} />
        )}
      </div>
    </header>
  );
};
