import React, { Component } from 'react';
import { connect } from 'react-redux';
import { orderProcess } from '../store/actions/';
import axios from '../axios-orders';
import Button from '../components/UI/Button';
import Spinner from '../components/UI/Spinner';
import FormInput from '../components/UI/FormInput';
import styles from './ContactInfo.module.css';
import withErrorHandler from '../hoc/withErrorHandler';
import validateFormData from '../utility/validateFormData';

class ContactInfo extends Component {
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
          required: true,
          isEmail: true
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
      const valid = validateFormData(value, state.orderForm[id].validation);
      const orderForm = {
        ...state.orderForm,
        [id]: {
          ...state.orderForm[id],
          value,
          valid,
          touched: true
        }
      };
      const formIsValid = Object.keys(orderForm).every(e => orderForm[e].valid);
      return { orderForm, formIsValid };
    });
  }

  orderHandler = e => {
    e.preventDefault();
    const orderData = {};
    for(let el in this.state.orderForm) {
      orderData[el] = this.state.orderForm[el].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData,
      userId: this.props.userId
    }
    this.props.onOrderProcess(order, this.props.token);
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
    if(this.props.loading) form = <Spinner />;

    return (
      <div className={styles.ContactInfo}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  price: state.burger.totalPrice,
  loading: state.order.loading,
  token: state.auth.idToken,
  userId: state.auth.userId
}),
  mapDispatchToProps = dispatch => ({
    onOrderProcess: (data, token) => dispatch(orderProcess(data, token))
  });

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInfo, axios));