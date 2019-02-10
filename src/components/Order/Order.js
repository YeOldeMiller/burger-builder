import React from 'react';
import styles from './Order.module.css';

export default function Order({ recipe, price }) {
  const burger = Object.entries(recipe)
    .filter(el => el[1] > 0)
    .map(el => (
      <span
        key={el[0]}
        style={{ 
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}>{`${el[0]} (${el[1]})`}
      </span>
    ))
  return (
    <div className={styles.Order}>
      <p>Burger with: {burger}</p>
      <p>Price: ${parseFloat(price).toFixed(2)}</p>
    </div>
  );
};
