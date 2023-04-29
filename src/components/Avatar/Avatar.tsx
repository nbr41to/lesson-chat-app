import { FC } from 'react';
import styles from './Avatar.module.css';
import Image from 'next/image';

type Props = {
  url: string;
  name?: string;
  size?: 'small' | 'medium';
};

export const Avatar: FC<Props> = ({ url, name, size = 'medium' }) => {
  const rootSizeStyles =
    size === 'small' ? styles.smallRoot : styles.mediumRoot;
  const imageSizeStyles =
    size === 'small' ? styles.smallImage : styles.mediumImage;
  const nameSizeStyles =
    size === 'small' ? styles.smallName : styles.mediumName;

  return (
    <div className={`${styles.root}  ${rootSizeStyles}`}>
      <Image
        className={`${styles.image}  ${imageSizeStyles}`}
        src={url}
        alt='avatar-image'
        width={size === 'small' ? 16 : 48}
        height={size === 'small' ? 16 : 48}
      />
      {name && <p className={`${styles.name} ${nameSizeStyles}`}>{name}</p>}
    </div>
  );
};
