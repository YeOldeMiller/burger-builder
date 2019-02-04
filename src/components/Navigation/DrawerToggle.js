import React from 'react';
import styles from './DrawerToggle.module.css';

export default function DrawerToggle({ toggle }) {
  return (
    <div className={styles.DrawerToggle} onClick = {toggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
