import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        idToken: action.payload.idToken,
        userId: action.payload.localId,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        idToken: null,
        userId: null
      };
    default: return state;
  }
};

export default authReducer;