import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: authData
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: error
});

export const logout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const logoutProceed = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const trackAuthTimeout = expTime => ({
  type: actionTypes.AUTH_SET_TIMEOUT,
  payload: expTime
});

export const auth = (email, password, signup) => ({
  type: actionTypes.AUTH_USER,
  payload: { email, password, signup }
});

export const authCheckState = () => (
  dispatch => {
    const loginData = JSON.parse(localStorage.getItem('login'));
    if(!loginData) dispatch(logout());
    else {
      const { idToken, localId, expDate } = loginData,
        newTimer = (new Date(expDate).getTime() - Date.now()) / 1000 | 0;
      if(newTimer <= 0) dispatch(logout());
      else {
        dispatch(authSuccess({ idToken, localId }));
        dispatch(trackAuthTimeout(newTimer));
      }
    }
  }
);