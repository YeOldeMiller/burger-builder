import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
        idToken: null,
        userId: null,
        error: null,
        loading: false
    });
  });

  it('should store token upon login', () => {
    expect(authReducer({
      idToken: null,
      userId: null,
      error: null,
      loading: false
    }, {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
        idToken: 'test-token',
        localId: 'test-userid'
      }
    })).toEqual({
      idToken: 'test-token',
      userId: 'test-userid',
      error: null,
      loading: false
    });
  })
});