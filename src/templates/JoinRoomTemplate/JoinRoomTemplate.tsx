import { FC } from 'react';
import { Room, User } from '@/models/types';

import { NestedPageHeader } from '@/components/NestedPageHeader';
import styles from './JoinRoomTemplate.module.css';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';

type Props = {
  room: Room | undefined;
  onJoinRoom: () => Promise<void>;
  isJoined: boolean;
};

export const JoinRoomTemplate: FC<Props> = ({ room, onJoinRoom, isJoined }) => {
  return (
    <>
      <NestedPageHeader title='ルームへ参加' />
      {room ? (
        <div className={styles.root}>
          <div className={styles.icon}>
            <Avatar size='large' name={room.name} url={room.thumbnailUrl} />
          </div>

          <div className={styles.buttonWrapper}>
            <Button
              label={isJoined ? '参加済み' : '参加する'}
              variant={isJoined ? 'secondary' : 'primary'}
              disabled={isJoined}
              onClick={onJoinRoom}
            />
          </div>
        </div>
      ) : (
        <p className={styles.notFoundMessage}>このルームは存在しません</p>
      )}
    </>
  );
};
