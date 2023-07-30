import { FC, ReactNode } from 'react';
import styles from './ConfirmModal.module.css';
import { Button } from '@/components/Button';
import { CautionIcon } from '@/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  primaryLabel: string;
  secondaryLabel: string;
  onClickPrimary: () => void;
  onClickSecondary: () => void;
  message: string | ReactNode;
};

export const ConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  primaryLabel,
  secondaryLabel,
  onClickPrimary,
  onClickSecondary,
  message,
}) => {
  return (
    <>
      {isOpen ? (
        <div className={styles.root}>
          {/* Overlay */}
          <div className={styles.overlay} onClick={onClose} />
          <div className={styles.content}>
            <CautionIcon />
            <p>{message}</p>
            <div className={styles.buttonWrapper}>
              <Button
                variant='secondary'
                size='medium'
                label={primaryLabel}
                onClick={onClickPrimary}
              />
              <Button
                variant='primary'
                size='medium'
                label={secondaryLabel}
                onClick={onClickSecondary}
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
