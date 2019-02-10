import React from 'react';
import styles from './NavItems.module.css';
import NavLink from './NavItem';

export default function NavItems() {
  return (
    <ul className={styles.NavItems}>
      <NavLink link="/" exact>Burger Builder</NavLink>
      <NavLink link="/orders">Orders</NavLink>
    </ul>
  );
};
