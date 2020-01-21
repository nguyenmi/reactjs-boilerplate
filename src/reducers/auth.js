import { Cookies } from 'react-cookie';
import moment from 'moment';
import Helpers from '../helpers';
import { AUTH_SET_TOKEN, GET_INFO_USER } from '../constants/actionTypes';

const cookies = new Cookies();
const now = new Date();

const initialState = {
  user: {
    dsChucDanh: []
  },
  isLogouted: false,
  ...cookies.get('authState')
};

export default function auth(state = initialState, action) {
  let authState = state;
  const user = action.payload;
  switch (action.type) {
    case AUTH_SET_TOKEN:
      if (action.data) {
        now.setMonth( now.getMonth() + 12 );
      }
      authState = {
        ...state,
        token: action.data,
        expires: now.toUTCString(),
        isLogouted: false
      };
      break;
    case GET_INFO_USER:
      authState = {
        ...state,
        user: user.data
      };
      break;

    default:
      authState = state;
  }
  cookies.set('authState', {
    token: Helpers.get(authState, 'token', undefined),
    isLogouted: authState.isLogouted,
    expires: authState.expires
  }, {
    path: '/',
    expires: moment(authState.expires).toDate()
  });

  return authState;
}
