import { put } from 'redux-saga/effects';
import * as actions from '../actions/';
import axios from '../../axios-orders';

export function* orderProcessSaga({ payload: { orderData, token } }) {
  try {
    console.log('got to saga')
    yield put(actions.orderStart());
    const res = yield axios.post('/orders.json?auth=' + token, orderData)
    yield put(actions.orderSuccess(res.data.name, orderData))
  }
  catch(err) {
    yield put(actions.orderFail(err));
  }
}

export function* fetchOrdersSaga({ payload: { token, userId } }) {
  try {
    yield put(actions.fetchOrdersStart());
    const query = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    const res = yield axios.get('/orders.json' + query);
    const orders = [];
    for(let key in res.data) {
      orders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(orders));
  }
  catch(err) {
    yield put(actions.fetchOrdersFail(err));
  }
}