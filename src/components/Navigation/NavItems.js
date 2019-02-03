import React from 'react';
import styles from './NavItems.module.css';
import NavLink from './NavLink';

export default function NavItems() {
  return (
    <ul className={styles.NavItems}>
      <NavLink link="/" active>Burger Builder</NavLink>
      <NavLink link="/">Checkout</NavLink>
    </ul>
  );
};
