import { FC, ReactNode, useState } from 'react';
import styles from './PulldownMenu.module.css';
import { IconButton } from '@/components/IconButton';

type Props = {
  buttonIcon: ReactNode;
  data: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }[];
  width?: number;
  height?: number;
};

export const PulldownMenu: FC<Props> = ({
  buttonIcon,
  data,
  width,
  height,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className={styles.root}>
      <IconButton
        icon={buttonIcon}
        width={width}
        height={height}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.menu}>
            {data.map((item, index) => (
              <div
                key={index}
                className={styles.item}
                onClick={() => handleClick(item.onClick)}
              >
                {item.icon}
                <div className={styles.label}>{item.label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
