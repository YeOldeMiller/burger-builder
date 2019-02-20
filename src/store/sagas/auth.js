import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/';

export function* logoutSaga(action) {
  yield localStorage.removeItem('login');
  yield put(actions.logoutProceed());
}

export function* trackAuthTimeoutSaga(action) {
  yield delay(action.payload * 1000);
  yield put(actions.logout())
}

export function* authSaga({ payload: { email, password, signup }}) {
  put(actions.authStart());
  const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/' + (signup ? 'signupNewUser' : 'verifyPassword') + '?key=' + process.env.REACT_APP_FIREBASE_KEY
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  try {
    const res = yield axios.post(url, authData)
    localStorage.setItem('login', JSON.stringify({
      idToken: res.data.idToken,
      localId: res.data.localId,
      expDate: new Date(new Date().getTime() + res.data.expiresIn * 1000)
    }));
    yield put(actions.authSuccess(res.data));
    yield put(actions.trackAuthTimeout(res.data.expiresIn));
  } catch(err) {
    yield put(actions.authFail(err.response.data.error));
  }
}