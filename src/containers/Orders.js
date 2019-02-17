import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/';
import Order from '../components/Order/Order';
import Spinner from '../components/UI/Spinner';
import axios from '../axios-orders';
import withErrorHandler from '../hoc/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />
    if(!this.props.loading) orders = (
      this.props.orders.map(order => (
        <Order
          key={order.id}
          recipe={order.ingredients}
          price={order.price}
        />
      ))
    );
    return (
      <div>
        {orders}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.idToken,
  userId: state.auth.userId
}),
  mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));