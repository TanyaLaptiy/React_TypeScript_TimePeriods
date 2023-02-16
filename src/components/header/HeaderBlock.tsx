import React from 'react';
import styles from './Header.module.scss';

export const HeaderBlock: React.FC = () => {
  return (
    <div className={styles.start}>
      <div className={styles.delimiter} />
      Исторические даты
    </div>
  );
};
