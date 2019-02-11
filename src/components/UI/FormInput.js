import React from 'react';
import styles from './FormInput.module.css';

export default function FormInput({ elementType, elementConfig, value, valid, validation, touched, change }) {
  let inputElement = null;
  const inputClasses = [styles.InputElement];
  if(!valid && validation && touched) inputClasses.push(styles.Invalid);
  switch(elementType) {
    case('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={change}
        >{elementConfig.options.map(el => (
          <option key={el.value} value={el.value}>{el.display}</option>))}
        </select>)
      break;
    case('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={change}
      />
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
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
