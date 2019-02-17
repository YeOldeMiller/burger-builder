import React from 'react';
import styles from './NavItems.module.css';
import NavItem from './NavItem';

export default function NavItems({ auth }) {
  return (
    <ul className={styles.NavItems}>
      <NavItem link="/" exact>Burger Builder</NavItem>
      {auth && <NavItem link="/orders">Orders</NavItem>}
      {auth
      ? <NavItem link="/logout">Logout</NavItem>
      : <NavItem link="/auth">Log in / Register</NavItem>}
    </ul>
  );
};
