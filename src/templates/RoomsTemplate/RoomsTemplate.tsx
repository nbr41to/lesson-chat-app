import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { RoomListItem } from '@/models/types';
import { SearchInput } from '@/components/SearchInput';
import styles from './RoomsTemplate.module.css';
import { RoomItem } from '@/components/RoomItem';
import {
  ChatCircleIcon,
  PlusCircleIcon,
  UserPlusWhiteIcon,
} from '@/components/icons';
import { PulldownMenu } from '@/components/PulldownMenu';

type Props = {
  rooms: RoomListItem[];
};

export const RoomsTemplate: FC<Props> = ({ rooms }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}>
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <PulldownMenu
          buttonIcon={<PlusCircleIcon width='32px' height='32px' />}
          data={[
            {
              icon: <ChatCircleIcon />,
              label: 'ルーム作成',
              onClick: () => router.push('/rooms/new'),
            },
            {
              icon: <UserPlusWhiteIcon />,
              label: 'フレンド追加',
              onClick: () => {},
            },
          ]}
          width={32}
          height={32}
        />
      </div>

      <div className={styles.roomList}>
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            onClick={() => router.push(`/rooms/${room.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
