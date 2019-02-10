import React, { Component } from 'react';
import axios from '../axios-orders';
import Button from '../components/UI/Button';
import Spinner from '../components/UI/Spinner';
import styles from './ContactInfo.module.css';

export default class ContactInfo extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipcode: ''
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
        const order = {
          ingredients: this.props.recipe,
          price: this.props.price
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
    let form = (
      <form>
        <input type="text" name="name" placeholder="Full Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="zipcode" placeholder="Postal Code" />
        <Button btnType="Success" click={this.orderHandler}>PLACE ORDER</Button>
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
