import * as actionTypes from './actionTypes';

export const orderStart = () => ({
  type: actionTypes.ORDER_START
});

export const orderSuccess = (id, orderData) => ({
  type: actionTypes.ORDER_SUCCESS,
  payload: { orderId: id, orderData }
});

export const orderFail = error => ({
  type: actionTypes.ORDER_FAIL,
  error
});

export const orderProcess = (orderData, token) => ({
  type: actionTypes.ORDER_PROCESS_START,
  payload: { orderData, token }
});

export const orderInit = () => ({
  type: actionTypes.ORDER_INIT
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload: error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS_INIT,
  payload: { token, userId }
});