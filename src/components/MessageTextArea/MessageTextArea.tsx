import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { PencilLineIcon } from '@/components/icons';
import styles from './MessageTextArea.module.css';

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const MessageTextArea: FC<Props> = ({ value, onChange }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const { borderTopWidth, borderBottomWidth, paddingTop, paddingBottom } =
      getComputedStyle(element);

    element.style.height = 'auto';
    element.style.height = `calc(${element.scrollHeight}px + ${paddingTop} + ${paddingBottom} + ${borderTopWidth} + ${borderBottomWidth} - 20px)`;
  }, [value]);

  return (
    <div className={styles.root}>
      <PencilLineIcon className={styles.pencilLineIcon} />
      <textarea
        className={styles.textarea}
        placeholder='メッセージを入力'
        rows={1}
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
};
