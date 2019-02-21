import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { logoutSaga, trackAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { orderProcessSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_SET_TIMEOUT, trackAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga),
    takeEvery(actionTypes.AUTH_INITIATE_AUTO_LOGIN, authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.FETCH_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield all([
    takeEvery(actionTypes.ORDER_PROCESS_START, orderProcessSaga),
    takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga)
  ]);
}