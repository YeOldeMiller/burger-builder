import React, { Component } from 'react';
import styles from './Modal.module.css';
import Backdrop from './Backdrop';

export default class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show ||
      (this.props.show && nextProps.children !== this.props.children);
  }

  render() {
    const { children, show, clear } = this.props;
    return (
      <>
        <div
          className={styles.Modal}
          style={{ 
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
          }}
        >
          {children}
        </div>
        <Backdrop clear={clear} show={show}/>
      </>
    );
  }
};
