import { useCallback } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';

type Properties = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const BaseModal: React.FC<Properties> = ({ children, open, onClose }) => {
  const isolateChildren = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    []
  );

  if (open) {
    return createPortal(
      <div
        aria-hidden="true"
        role="button"
        onClick={onClose}
        className={styles.container}
      >
        <div aria-hidden="true" role="button" onClick={isolateChildren}>
          {children}
        </div>
      </div>,
      document.querySelector('#portal') as Element
    );
  }
  return null;
};

export { BaseModal };
