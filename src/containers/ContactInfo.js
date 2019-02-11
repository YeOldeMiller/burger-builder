import React, { Component } from 'react';
import axios from '../axios-orders';
import Button from '../components/UI/Button';
import Spinner from '../components/UI/Spinner';
import FormInput from '../components/UI/FormInput';
import styles from './ContactInfo.module.css';

export default class ContactInfo extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Full Name'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Address'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 12
        },
        value: '',
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'economy', display: 'Economy' },
            { value: 'standard', display: 'Standard' },
            { value: 'express', display: 'Express' }
          ]
        },
        value: 'economy',
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  formInputHandler = ({ target: { value } }, id) => {
    this.setState(state => {
      const valid = this.validateFormData(value, state.orderForm[id].validation),
        formIsValid = valid && !Object.keys(state.orderForm).some(e => !state.orderForm[e].valid);
      const orderForm = {
        ...state.orderForm,
        [id]: {
          ...state.orderForm[id],
          value,
          valid,
          touched: true
        }
      }
      return { orderForm, formIsValid };
    });
  }

  validateFormData(value, rules) {
    if(!rules) return true;
    let isValid = true;
    if(rules.required) isValid = isValid && value.trim() !== '';
    if(rules.minLength) isValid = isValid && value.length >= rules.minLength;
    if(rules.maxLength) isValid = isValid && value.length <= rules.maxLength;
    return isValid;
  }

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
      const orderData = {};
      for(let el in this.state.orderForm) {
        orderData[el] = this.state.orderForm[el].value;
      }
      const order = {
        ingredients: this.props.recipe,
        price: this.props.price,
        orderData
      }
      return axios.post('/orders.json', order)
        .then(console.log)
        .catch(console.log)
        .finally(setTimeout(() => {
          this.setState({ loading: false });
          this.props.history.push('/')
        }, 500));
  }
  
  render() {
    const formArray = [];
    for(let key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formArray.map(({ id, config: { elementType, elementConfig, validation, value, valid, touched } }) => (
        <FormInput
          key={id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          validation={!!validation}
          valid={valid}
          touched={touched}
          change={e => this.formInputHandler(e, id)}
        />)
        )}
        <Button btnType="Success" disabled={!this.state.formIsValid}>PLACE ORDER</Button>
      </form>
    );
    if(this.state.loading) form = <Spinner />;

    return (
      <div className={styles.ContactInfo}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
};
