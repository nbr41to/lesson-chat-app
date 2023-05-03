import { FC, ReactNode } from 'react';
import styles from './Button.module.css';

type Props = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: ReactNode;
};

export const Button: FC<Props> = ({
  label,
  disabled = false,
  onClick,
  variant = 'primary',
  size = 'large',
  leftIcon,
}) => {
  const variantStyles =
    variant === 'primary' ? styles.primary : styles.secondary;
  const sizeStyles = styles[size];

  return (
    <button
      className={`${styles.button} ${variantStyles} ${sizeStyles}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && leftIcon}
      {label}
    </button>
  );
};
