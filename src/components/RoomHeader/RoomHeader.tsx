import { FC, useState } from 'react';
import styles from './RoomHeader.module.css';
import {
  ArrowDownIcon,
  DotsThreeIcon,
  PencilIcon,
  UsersThreeIcon,
} from '@/components/icons';
import { PulldownMenu } from '@/components/PulldownMenu';
import { IconButton } from '@/components/IconButton';
import { useRouter } from 'next/router';

type Props = {
  name: string;
  amount: number;
};

export const RoomHeader: FC<Props> = ({ name, amount }) => {
  const router = useRouter();
  const amountString = amount > 2 ? `(${amount})` : '';

  return (
    <header className={styles.root}>
      <IconButton
        icon={<ArrowDownIcon />}
        width={18}
        height={18}
        onClick={router.back}
      />
      <div className={styles.name}>
        {name}
        {amountString}
      </div>
      <PulldownMenu
        buttonIcon={<DotsThreeIcon />}
        data={[
          {
            icon: <UsersThreeIcon />,
            label: 'メンバー',
            onClick: () => {},
          },
          {
            icon: <PencilIcon />,
            label: 'グループ編集',
            onClick: () => {},
          },
        ]}
      />
    </header>
  );
};
