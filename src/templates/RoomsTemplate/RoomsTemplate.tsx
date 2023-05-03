import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { RoomCreateParams, RoomListItem, User } from '@/models/types';
import { SearchInput } from '@/components/SearchInput';
import styles from './RoomsTemplate.module.css';
import { RoomItem } from '@/components/RoomItem';
import {
  ChatCircleIcon,
  PlusCircleIcon,
  UserPlusWhiteIcon,
} from '@/components/icons';
import { PulldownMenu } from '@/components/PulldownMenu';
import { Drawer } from '@/components/Drawer';
import { RoomCreateForm } from '@/components/RoomCreateForm';
import { SearchFriendForm } from '@/components/SearchFriendForm';

type Props = {
  rooms: RoomListItem[];
  friends: User[];
  onCreateRoom: (params: RoomCreateParams) => Promise<void>;
  onSearchFriend: (friendId: string) => Promise<void>;
};

export const RoomsTemplate: FC<Props> = ({
  rooms,
  friends,
  onCreateRoom,
  onSearchFriend,
}) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleOnCreate = async (params: RoomCreateParams) => {
    await onCreateRoom(params);
    setIsCreating(false);
  };

  return (
    <>
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
                onClick: () => setIsCreating(true),
              },
              {
                icon: <UserPlusWhiteIcon />,
                label: 'フレンド追加',
                onClick: () => setIsSearching(true),
              },
            ]}
            width={32}
            height={32}
          />
        </div>

        <div className={styles.roomList}>
          {rooms
            .filter((room) => room.name.includes(searchText))
            .map((room) => (
              <RoomItem
                key={room.id}
                room={room}
                onClick={() => router.push(`/rooms/${room.id}`)}
              />
            ))}
        </div>
      </div>
      <Drawer
        title='ルーム作成'
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
      >
        <RoomCreateForm friends={friends} onSubmit={handleOnCreate} />
      </Drawer>
      <Drawer
        title='フレンド検索'
        isOpen={isSearching}
        onClose={() => setIsSearching(false)}
      >
        <SearchFriendForm
          onSubmit={onSearchFriend}
          onCancel={() => setIsSearching(false)}
        />
      </Drawer>
    </>
  );
};
