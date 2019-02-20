import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { logoutSaga, trackAuthTimeoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_SET_TIMEOUT, trackAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, auth)
}