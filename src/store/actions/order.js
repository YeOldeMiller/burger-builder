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

export const orderInit = () => ({
  type: actionTypes.ORDER_INIT
});

const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders
});

const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload: error
});

const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => (
  dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(res => {
        const orders = [];
        for(let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(err => dispatch(fetchOrdersFail(err)));
  }
);