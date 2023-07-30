import { FC, ReactNode } from 'react';
import { ArrowDownIcon, DotsThreeIcon } from '@/icons';
import { PulldownMenu } from '@/components/PulldownMenu';
import { IconButton } from '@/components/IconButton';
import { useRouter } from 'next/router';
import styles from './NestedPageHeader.module.css';

type Props = {
  title: string;
  menuItems?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }[];
  onBack?: () => void;
};

export const NestedPageHeader: FC<Props> = ({ title, menuItems, onBack }) => {
  const router = useRouter();

  return (
    <header className={styles.root}>
      <IconButton
        icon={<ArrowDownIcon />}
        width={18}
        height={18}
        onClick={onBack ? onBack : router.back}
      />
      <div className={styles.title}>{title}</div>
      <div className={styles.menuButton}>
        {menuItems && (
          <PulldownMenu buttonIcon={<DotsThreeIcon />} data={menuItems} />
        )}
      </div>
    </header>
  );
};
