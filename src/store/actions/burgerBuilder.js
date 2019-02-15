import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = val => ({ type: actionTypes.ADD_INGREDIENT, payload: val });
export const removeIngredient = val => ({ type: actionTypes.REMOVE_INGREDIENT, payload: val });

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: ingredients
});

const fetchFailed = () => ({
  type: actionTypes.FETCH_FAILED
});

export const initIngredients = () => (dispatch => {
  axios.get('/ingredients.json')
      .then(res => dispatch(setIngredients(res.data)))
      .catch(err => dispatch(fetchFailed()));
});