import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../components/Order/CheckoutSummary';
import ContactInfo from './ContactInfo';

class Checkout extends Component {
  render() {
    if(!this.props.ingredients || this.props.done) return <Redirect to="/" />
    return (
      <>
        <CheckoutSummary
          recipe={this.props.ingredients}
          checkoutCancel={() => this.props.history.goBack()}
          checkoutProceed={() => this.props.history.replace('/checkout/contact-info')}
        />
         <Route path={this.props.match.url + '/contact-info'} component={ContactInfo} />
      </>
    );
  }
};

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  done: state.order.checkoutComplete
});

export default connect(mapStateToProps)(Checkout);
