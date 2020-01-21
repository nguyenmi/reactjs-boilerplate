import {
  AUTH_SET_TOKEN,
  AUTH_DISCARD_TOKEN,
  GET_INFO_USER,
  API_FETCH,
  API_FAILED,
  API_DEFAULT
} from '../constants/actionTypes';

export const setToken = data => ({
  type: AUTH_SET_TOKEN,
  data
});

export const authLogout = () => ({
  type: AUTH_DISCARD_TOKEN
});

export const signin = data => (dispatch, getState) => dispatch({
  types: [API_FETCH, API_DEFAULT, API_FAILED],
  payload: {
    client: 'auth',
    request: {
      url: '/auth/login',
      method: 'POST',
      headers: {
        'X-API-VERSION': 1
      },
      data
    }
  }
});

export const getInfoUser = () => (dispatch, getState) => {
  return dispatch({
    types: [API_FETCH, GET_INFO_USER, API_FAILED],
    payload: {
      client: 'auth',
      request: {
        url: '/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          'X-API-VERSION': 1
        }
      }
    }
  });
};
