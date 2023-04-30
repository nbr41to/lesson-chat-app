import { ChangeEvent, FC } from 'react';
import { SearchIcon } from '@/components/icons';
import styles from './MessageInput.module.css';

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const MessageInput: FC<Props> = ({ value, onChange }) => {
  return (
    <div className={styles.root}>
      <SearchIcon />
      <input
        className={styles.input}
        type='text'
        placeholder='メッセージを入力'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
