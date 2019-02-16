import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  checkoutComplete: false
}

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ORDER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        checkoutComplete: true,
        orders: state.orders.concat({ ...action.payload.orderData, id: action.payload.orderId })
      };
    case actionTypes.ORDER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.ORDER_INIT:
      return {
        ...state,
        checkoutComplete: false
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    default: return state;
  }
};

export default orderReducer;