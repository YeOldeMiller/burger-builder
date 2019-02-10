import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

export default function NavItem({ link, children, exact }) {
  return (
    <li className={styles.NavItem}>
      <NavLink to={link} exact={exact} activeClassName={styles.active}>{children}</NavLink>
    </li>
  );
};
