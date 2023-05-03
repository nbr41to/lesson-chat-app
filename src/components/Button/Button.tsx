import { FC, ReactNode } from 'react';
import styles from './Button.module.css';

type Props = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: ReactNode;
};

export const Button: FC<Props> = ({
  variant = 'primary',
  label,
  onClick,
  size = 'large',
  leftIcon,
}) => {
  const variantStyles =
    variant === 'primary' ? styles.primary : styles.secondary;
  const sizeStyles = styles[size];

  return (
    <button
      className={`${styles.button} ${variantStyles} ${sizeStyles}`}
      onClick={onClick}
    >
      {leftIcon && leftIcon}
      {label}
    </button>
  );
};
