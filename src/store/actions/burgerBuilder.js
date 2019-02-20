import * as actionTypes from './actionTypes';

export const addIngredient = val => ({
  type: actionTypes.ADD_INGREDIENT, payload: val
});

export const removeIngredient = val => ({
  type: actionTypes.REMOVE_INGREDIENT, payload: val
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: ingredients
});

export const fetchFailed = () => ({
  type: actionTypes.FETCH_FAILED
});

export const initIngredients = () => ({
  type: actionTypes.FETCH_INGREDIENTS
});