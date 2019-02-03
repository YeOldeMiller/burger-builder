import React from 'react';
import styles from './NavLink.module.css';

export default function NavLink({ link, active, children }) {
  return (
    <li className={styles.NavLink}>
      <a
        href={link}
        className={active ? styles.active : null}
      >{children}</a>
    </li>
  );
};
