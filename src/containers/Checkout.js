import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../components/Order/CheckoutSummary';
import ContactInfo from './ContactInfo';

export default class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    for(let entry of query.entries()) {
      ingredients[entry[0]] = parseInt(entry[1]);
    }
    this.setState({ ingredients, totalPrice: this.props.location.state });
  }

  render() {
    return (
      <>
        <CheckoutSummary
          recipe={this.state.ingredients}
          checkoutCancel={() => this.props.history.goBack()}
          checkoutProceed={() => this.props.history.replace('/checkout/contact-info')}
        />
         <Route path={this.props.match.url + '/contact-info'} render={props => (<ContactInfo recipe={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
      </>
    );
  }
};
