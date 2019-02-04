import React from 'react';
import styles from './ControlGroup.module.css';

export default function ControlGroup({ label, click, disabled }) {
  return (
    <div className={styles.ControlGroup}>
      <div className={styles.Label}>{label}</div>
      <button
        className={styles.Less}
        onClick={type => click(type)(-1)}
        disabled={disabled}
      >Less</button>
      <button
        className={styles.More}
        onClick={type => click(type)(1)}
      >More</button>
    </div>
  )
};
