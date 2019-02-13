import React from 'react';
import styles from './ControlGroup.module.css';

export default function ControlGroup({ label, add, remove, disabled }) {
  return (
    <div className={styles.ControlGroup}>
      <div className={styles.Label}>{label}</div>
      <button
        className={styles.Less}
        onClick={remove}
        disabled={disabled}
      >Less</button>
      <button
        className={styles.More}
        onClick={add}
      >More</button>
    </div>
  )
};
