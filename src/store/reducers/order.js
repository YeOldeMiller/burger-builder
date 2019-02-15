import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
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
        orders: state.orders.concat({ ...action.payload.orderData, id: action.payload.orderId })
      };
    case actionTypes.ORDER_FAIL:
      return {
        ...state,
        loading: false
      };
    default: return state;
  }
};

export default orderReducer;