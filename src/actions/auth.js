import {
  AUTH_SET_TOKEN,
  AUTH_DISCARD_TOKEN,
  GET_INFO_USER,
  API_FETCH,
  API_FAILED
} from '../constants/actionTypes';

export const setToken = data => ({
  type: AUTH_SET_TOKEN,
  data
});

export const authLogout = () => ({
  type: AUTH_DISCARD_TOKEN
});

export const getInfoUser = (chucDanhId = null) => (dispatch, getState) => dispatch({
  types: [API_FETCH, GET_INFO_USER, API_FAILED],
  payload: {
    client: 'auth',
    request: {
      url: '/api/me',
      method: 'GET',
      headers: {
        Authorization: `${getState().auth.token.tokenType} ${getState().auth.token.accessToken}`,
        'X-API-VERSION': 1
      }
    }
  },
  chucDanhId
});
