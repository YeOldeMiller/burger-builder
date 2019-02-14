import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../components/Order/CheckoutSummary';
import ContactInfo from './ContactInfo';

class Checkout extends Component {
  render() {
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
  ingredients: state.ingredients
});

export default connect(mapStateToProps)(Checkout);
