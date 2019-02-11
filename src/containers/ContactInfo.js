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
        valid: false
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
        valid: false
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
        valid: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false
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
        value: ''
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
        value: 'economy'
      }
    },
    loading: false
  };

  formInputHandler = ({ target: { value } }, id) => {
    
    this.setState(state => {
      const valid = this.validateFormData(value, state.orderForm[id].validation);
      const orderForm = {
        ...state.orderForm,
        [id]: {
          ...state.orderForm[id],
          value,
          valid
        }
      }
      return { orderForm };
    });
  }

  validateFormData(value, rules) {
    let isValid = false;
    if(rules.required) {
      isValid = value.trim() !== '';
    }
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
        {formArray.map(({ id, config: { elementType, elementConfig, value } }) => (
        <FormInput
          key={id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          change={e => this.formInputHandler(e, id)}
        />)
        )}
        <Button btnType="Success">PLACE ORDER</Button>
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
