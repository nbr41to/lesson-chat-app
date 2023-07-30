import { ChangeEvent, FC } from 'react';
import { SearchIcon } from '@/icons';
import styles from './SearchInput.module.css';

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput: FC<Props> = ({ value, onChange }) => {
  return (
    <div className={styles.root}>
      <SearchIcon />
      <input
        className={styles.input}
        type='text'
        placeholder='検索'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
