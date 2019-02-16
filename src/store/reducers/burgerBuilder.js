import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  base: 4,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const builderReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      if(!state.ingredients[action.payload]) return;
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1
        }
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        totalPrice: initialState.totalPrice,
        ingredients: {
          salad: action.payload.salad,
          bacon: action.payload.bacon,
          cheese: action.payload.cheese,
          meat: action.payload.meat
        }
      };
    case actionTypes.FETCH_FAILED:
      return {
        ...state,
        error: true
      };
    default: return state;
  }
};

export default builderReducer;