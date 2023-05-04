import { FC } from 'react';
import styles from './Avatar.module.css';
import Image from 'next/image';

type Props = {
  url: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
};

const range = {
  small: 16,
  medium: 48,
  large: 72,
};

export const Avatar: FC<Props> = ({ url, name, size = 'medium' }) => {
  const sizeStyles = styles[size];
  const imageStyles = size === 'small' ? styles.smallImage : styles.image;
  const nameStyles = size === 'small' ? styles.smallName : styles.name;

  return (
    <div className={`$styles.root} ${sizeStyles}`}>
      <Image
        className={imageStyles}
        src={url}
        alt='avatar-image'
        width={range[size]}
        height={range[size]}
      />
      {name && <p className={nameStyles}>{name}</p>}
    </div>
  );
};
