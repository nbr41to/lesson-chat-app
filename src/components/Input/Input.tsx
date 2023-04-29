import { ChangeEvent, FC, useId } from 'react';
import styles from './Input.module.css';

type Props = {
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<Props> = ({
  type = 'text',
  placeholder,
  value,
  label,
  onChange,
}) => {
  const id = useId();

  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      <input
        id={id}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
