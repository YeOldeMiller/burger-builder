import React from 'react';
import Button from '../UI/Button';

export default function OrderSummary({ ingredients, price, checkoutProceed, checkoutCancel }) {
  const ingredientList = Object.keys(ingredients)
    .filter(key => ingredients[key] > 0)
    .map(key => (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {ingredients[key]}
      </li>
    ));

  return (
    <>
      <h3>Your Order</h3>
      <p>A burger with the following ingredients:</p>
      <ul>
        {ingredientList}
      </ul>
      <p><strong>Total: ${price.toFixed(2)}</strong></p>
      <p>Proceed to checkout?</p>
      <Button
        click={checkoutCancel}
        btnType='Danger'
      >CANCEL
      </Button>
      <Button
        click={checkoutProceed}
        btnType='Success'
      >CONTINUE
      </Button>
    </>
  )
};
