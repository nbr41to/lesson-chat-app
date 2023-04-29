import { FC, ReactNode } from 'react';
import styles from './ConfirmModal.module.css';
import { Button } from '@/components/Button';

type Props = {
  open: boolean;
  onClose: () => void;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
  message: string | ReactNode;
};

export const ConfirmModal: FC<Props> = ({
  open,
  onClose,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  message,
}) => {
  return (
    <>
      {open ? (
        <div className={styles.root}>
          {/* Overlay */}
          <div className={styles.overlay} onClick={onClose} />
          <div className={styles.content}>
            <p>{message}</p>
            <div className={styles.buttonWrapper}>
              <Button
                variant='secondary'
                size='medium'
                label={primaryLabel}
                onClick={onPrimary}
              />
              <Button
                variant='primary'
                size='medium'
                label={secondaryLabel}
                onClick={onSecondary}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
