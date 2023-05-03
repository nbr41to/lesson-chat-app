import { FC } from 'react';
import styles from './AccountTemplate.module.css';

import { SettingIcon, UserPlusBlackIcon } from '@/components/icons';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { User } from '@/types';

type Props = {
  user: User;
};

export const AccountTemplate: FC<Props> = ({ user }) => {
  console.log(user);
  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}>
        <h2>プロフィール</h2>
        <SettingIcon />
      </div>

      <div className={styles.profileWrapper}>
        <Avatar size='large' url='https://picsum.photos/200' />
        <div className={styles.profile}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.publicId}>ID：{user.publicId}</div>
        </div>
        <Button size='small' label='編集' onClick={() => {}} />
      </div>

      <Button
        variant='secondary'
        size='large'
        label='フレンド追加'
        leftIcon={<UserPlusBlackIcon />}
        onClick={() => {}}
      />

      <div>
        <h2>フレンド(5)</h2>
      </div>
    </div>
  );
};
