import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../Logo';
import NavItems from '../Navigation/NavItems';
import Backdrop from '../UI/Backdrop';

export default function SideDrawer({ show, clear, auth }) {
  const style = [styles.SideDrawer];
  if(show) style.push(styles.Open);
  else style.push(styles.Close);
  return (
    <>
      <div className={style.join(' ')} onClick={clear}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems auth={auth} />
        </nav>
      </div>
      <Backdrop show={show} clear={clear}/>
    </>
  );
};
