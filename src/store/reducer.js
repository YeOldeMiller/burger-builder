import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  base: 4,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
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
    default: return state;
  }
};

export default reducer;