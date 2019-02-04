import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo';
import NavItems from '../Navigation/NavItems';
import DrawerToggle from './DrawerToggle';

export default function Toolbar({ toggle }) {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle toggle={toggle} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}><NavItems /></nav>
    </header>
  );
};
