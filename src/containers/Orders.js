import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/';
import Order from '../components/Order/Order';
import Spinner from '../components/UI/Spinner';
import axios from '../axios-orders';
import withErrorHandler from '../hoc/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    if(this.props.loading) return <Spinner />
    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            recipe={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
}),
  mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));