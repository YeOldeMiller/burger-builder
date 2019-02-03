import React from 'react';
import styles from './Backdrop.module.css';

export default function Backdrop({ show, clear }) {
  return (
    show ?
      <div
        className={styles.Backdrop}
        onClick={clear}
      ></div> : null
  );
};
