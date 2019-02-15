import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const orderStart = () => ({
  type: actionTypes.ORDER_START
});

const orderSuccess = (id, orderData) => ({
  type: actionTypes.ORDER_SUCCESS,
  payload: { orderId: id, orderData }
});

const orderFail = error => ({
  type: actionTypes.ORDER_FAIL,
  error
});

export const orderProcess = orderData => (
  dispatch => {
    dispatch(orderStart());
    axios.post('/orders.json', orderData)
      .then(res => dispatch(orderSuccess(res.data.name, orderData)))
      .catch(err => dispatch(orderFail(err)));
  }
);