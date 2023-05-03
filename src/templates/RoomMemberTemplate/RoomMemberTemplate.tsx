import type { FC } from 'react';
import { Room } from '@/models/types';

import { NestedPageHeader } from '@/components/NestedPageHeader';
import { Avatar } from '@/components/Avatar';
import { PlusIcon } from '@/components/icons';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import styles from './RoomMemberTemplate.module.css';

type Props = {
  room: Room;
};

export const RoomMemberTemplate: FC<Props> = ({ room }) => {
  return (
    <div className={styles.root}>
      <NestedPageHeader title='メンバー' />

      <div className={styles.pageBody}>
        <div className={styles.userItems}>
          {room.users.map((member) => (
            <Avatar key={member.id} url={member.avatarUrl} name={member.name} />
          ))}
          <IconButton
            icon={<PlusIcon />}
            width={48}
            height={48}
            onClick={() => {}}
          />
        </div>

        <div className={styles.copyLink}>
          <p>ルームのリンク：xxxxxxxxxxxxxxxxxx</p>
          <Button label='ルームのリンクをコピー' onClick={() => {}} />
        </div>
        <Button variant='secondary' label='ルームを退会' onClick={() => {}} />
      </div>
    </div>
  );
};
