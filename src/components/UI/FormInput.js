import React from 'react';
import styles from './FormInput.module.css';

export default function FormInput({ elementType, elementConfig, value, change }) {
  let inputElement = null;
  switch(elementType) {
    case('select'):
      inputElement = (
        <select
          className={styles.InputElement}
          value={value}
          onChange={change}
        >{elementConfig.options.map(el => (
          <option key={el.value} value={el.value}>{el.display}</option>))}
        </select>)
      break;
    case('textarea'):
      inputElement = <textarea
        className={styles.InputElement}
        {...elementConfig}
        value={value}
        onChange={change}
      />
      break;
    default:
      inputElement = <input
        className={styles.InputElement}
        {...elementConfig}
        value={value}
        onChange={change}
      />;
  }

  return (
    <div className={styles.FormInput}>
      <label className={styles.Label}></label>
      {inputElement}
    </div>
  );
};
