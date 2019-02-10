import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button';
import styles from './CheckoutSummary.module.css';

export default function CheckoutSummary({ recipe, checkoutCancel, checkoutProceed }) {
  return (
    <div className={styles.CheckoutSummary}>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <Burger recipe={recipe}/>
      </div>
      <Button btnType="Danger" click={checkoutCancel}>CANCEL</Button>
      <Button btnType="Success" click={checkoutProceed}>CONTINUE</Button>
    </div>
  );
};
