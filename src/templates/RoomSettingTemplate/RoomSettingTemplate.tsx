import { FC, useState } from 'react';
import { RoomBase } from '@/models/types';

import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './RoomSettingTemplate.module.css';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

type Props = {
  room: RoomBase;
};

export const RoomSettingTemplate: FC<Props> = ({ room }) => {
  const [name, setName] = useState(room.name);

  return (
    <div className={styles.root}>
      <NestedPageHeader title='グループ編集' />

      <div className={styles.pageBody}>
        <div className={styles.icon}>
          <Avatar size='large' url={room.thumbnailUrl} />
        </div>

        <Input
          label='グループ名'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.submitButtonWrapper}>
          <Button label='変更' onClick={() => {}} />
        </div>
        <div className={styles.deleteButtonWrapper}>
          <Button
            variant='secondary'
            label='グループを消去'
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
