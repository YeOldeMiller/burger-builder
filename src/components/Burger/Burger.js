import React from 'react';
import styles from './Burger.module.css';
import Ingredient from './Ingredient';

export default function Burger({ recipe }) {
  let ingredients = Object.keys(recipe)
    .map(key => [ ...Array(recipe[key]) ].map((_, i) => 
      <Ingredient key={key + i} type={key} />
    )).reduce((acc, el) => acc.concat(el), []);
    if(ingredients.length === 0) ingredients = (
      <p>Start building your burger!</p>
    )

  return (
    <div className={styles.Burger}>
      <Ingredient type="bread-top" />
      {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
}
