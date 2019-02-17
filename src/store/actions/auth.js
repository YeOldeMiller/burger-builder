import axios from 'axios';
import * as actionTypes from './actionTypes';

const authStart = () => ({
  type: actionTypes.AUTH_START
});

const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: authData
});

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: error
});

export const logout = () => {
  localStorage.removeItem('login');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

const trackAuthTimeout = expTime => (
  dispatch => {
    setTimeout(() => dispatch(logout()), expTime * 1000);
  }
)

export const auth = (email, password, signup) => (
  dispatch => {
    dispatch(authStart());
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/' + (signup ? 'signupNewUser' : 'verifyPassword') + '?key=AIzaSyDovPX-fwrI0FHTJMFhzLJAVj3U7uvr3MU'
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    axios.post(url, authData)
      .then(res => {
        localStorage.setItem('login', JSON.stringify({
          idToken: res.data.idToken,
          localId: res.data.localId,
          expDate: new Date(new Date().getTime() + res.data.expiresIn * 1000),
        }));
        dispatch(authSuccess(res.data));
        dispatch(trackAuthTimeout(res.data.expiresIn));
      })
      .catch(err => dispatch(authFail(err.response.data.error)));
  }
);

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