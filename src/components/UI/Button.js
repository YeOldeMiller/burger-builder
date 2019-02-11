import React from 'react';
import styles from './Button.module.css';

export default function Button({ click, children, btnType, disabled }) {
  return (
    <button
      className={[styles.Button, styles[btnType]].join(' ')}
      onClick={click}
      disabled={disabled}
    >{children}
    </button>
  );
};
