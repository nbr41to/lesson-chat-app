import type { FC } from 'react';
import { Room } from '@/types';

import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './RoomMemberTemplate.module.css';
import { Avatar } from '@/components/Avatar';
import { PlusIcon } from '@/components/icons';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';

type Props = {
  room: Room;
};

export const RoomMemberTemplate: FC<Props> = ({ room }) => {
  console.log(room);

  return (
    <div className={styles.root}>
      <NestedPageHeader name='メンバー' />

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
          <p>グループのリンク：xxxxxxxxxxxxxxxxxx</p>
          <Button label='グループのリンクをコピー' onClick={() => {}} />
        </div>
        <Button variant='secondary' label='グループを退会' onClick={() => {}} />
      </div>
    </div>
  );
};
