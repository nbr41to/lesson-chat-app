import { FC, useState } from 'react';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import { Room } from '@/types';
import { SearchInput } from '@/components/SearchInput';
import styles from './RoomsTemplate.module.css';
import { RoomItem } from '@/components/RoomItem';
import { IconButton } from '@/components/IconButton';
import { PlusCircleIcon } from '@/components/icons';

type Props = {
  rooms: Room[];
  onCreateRoom: (room: Room) => void;
};

export const RoomsTemplate: FC<Props> = ({ rooms }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  console.log(rooms);

  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}>
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton
          icon={<PlusCircleIcon />}
          width={32}
          height={32}
          onClick={() => setOpenMenu(!openMenu)}
        />
      </div>

      <div className={styles.roomList}>
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            room={rooms[0]}
            latestMessage='最新のメッセージ'
            onClick={() => router.push(`/rooms/${room.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
