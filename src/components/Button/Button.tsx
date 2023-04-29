import { FC } from 'react';
import styles from './Button.module.css';

type Props = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};

export const Button: FC<Props> = ({
  variant = 'primary',
  label,
  onClick,
  size = 'large',
}) => {
  const variantStyles =
    variant === 'primary' ? styles.primary : styles.secondary;
  const sizeStyles = styles[size];

  return (
    <button
      className={`${styles.button} ${variantStyles} ${sizeStyles}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
