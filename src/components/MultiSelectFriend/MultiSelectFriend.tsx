import { FC, useState } from 'react';
import styles from './MultiSelectFriend.module.css';
import { User } from '@/models/types';
import { FriendItem } from '@/components/FriendItem';
import { SearchInput } from '@/components/SearchInput';

type Props = {
  friends: User[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export const MultiSelectFriend: FC<Props> = ({
  friends,
  selectedIds,
  onToggle,
}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.root}>
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={styles.selectItemList}>
        {friends
          .filter((user) => user.name.includes(searchText))
          .map((user) => (
            <div
              key={user.id}
              className={styles.selectItem}
              onClick={() => onToggle(user.id)}
            >
              <input type='checkbox' checked={selectedIds.includes(user.id)} />
              <FriendItem {...user} />
            </div>
          ))}
      </div>
    </div>
  );
};
