import React from 'react';
import ControlGroup from './ControlGroup';
import styles from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

export default function BuildControls({ price, add, remove, disabled, checkout }) {
  const disallowOrder = Object.values(disabled).every(e => e);
  return (
    <div className={styles.BuildControls}>
      <p>Total: <strong>${price.toFixed(2)}</strong></p>
      {controls.map(ctl =>
        <ControlGroup
          key={ctl.label}
          label={ctl.label}
          add={() => add(ctl.type)}
          remove={() => remove(ctl.type)}
          disabled={disabled[ctl.type]}
        />
      )}
      <button
        className={styles.OrderButton}
        disabled={disallowOrder}
        onClick={checkout}
      >ORDER NOW</button>
    </div>
  );
};
