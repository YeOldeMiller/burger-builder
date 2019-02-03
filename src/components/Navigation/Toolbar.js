import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo';
import NavItems from '../Navigation/NavItems';

export default function Toolbar({  }) {
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <Logo />
      <NavItems />
    </header>
  );
};
