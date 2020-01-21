import { Cookies } from 'react-cookie';
import moment from 'moment';
import Helpers from '../helpers';

const cookies = new Cookies();

const initialState = cookies.get('authState') ? cookies.get('authState') : {
  user: {
    dsChucDanh: []
  },
  isLogouted: false
};

export default function auth(state = initialState, action) {
  let authState = state;
  switch (action.type) {
    default:
      authState = state;
  }

  cookies.set('authState', {
    token: {
      accessToken: Helpers.get(authState, 'token.accessToken', undefined),
      tokenType: Helpers.get(authState, 'token.tokenType', undefined)
    },
    isLogouted: authState.isLogouted,
    chucDanhId: authState.chucDanhId,
    expires: authState.expires
  }, {
    path: '/',
    expires: moment(authState.expires).toDate()
  });

  return authState;
}
