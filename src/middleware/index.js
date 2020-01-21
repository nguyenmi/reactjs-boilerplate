import axios from 'axios';
import { camelizeKeys } from 'humps';
import { getActionTypes } from 'redux-axios-middleware';
import { Cookies } from 'react-cookie';
import { authLogout } from '../actions';
import config from '../constants/configAPI';

const { API_AUTH, API_FILE } = config;
const cookies = new Cookies();

export const apiClients = {
  default: {
    client: axios.create({
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 0
      },
      transformResponse: [function onConvertResponse(data) {
        if (data) {
          return camelizeKeys(typeof data !== 'object' ? JSON.parse(data) : data);
        }
        return {};
      }]
    })
  },
  auth: {
    client: axios.create({
      baseURL: API_AUTH,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 0
      },
      transformResponse: [function convertResponse(data) {
        if (data) {
          return camelizeKeys(typeof data !== 'object' ? JSON.parse(data) : data);
        }
        return {};
      }]
    })
  },
  file: {
    client: axios.create({
      baseURL: API_FILE,
      responseType: 'json',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 0
      },
      transformRequest: [(data) => {
        const formData = new FormData();
        const value = data;
        // eslint-disable-next-line no-restricted-syntax
        for (const e in value) {
          if (value[e] && value[e].name) {
            formData.append(e, value[e], value[e].name);
          }
        }
        return formData;
      }],
      transformResponse: [function onConvertResponse(data) {
        if (data) {
          return camelizeKeys(typeof data !== 'object' ? JSON.parse(data) : data);
        }
        return {};
      }]
    })
  },
  download: {
    client: axios.create({
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: -1
      }
    })
  }
};

export const apiMiddlewareConfig = {
  interceptors: {
    request: [
      function onConvertRequest({ getState, dispatch, getSourceAction }, req) {
        // req: contains information about request object
        if (cookies.get('authState') && cookies.get('authState').chucDanhId) {
          req.headers['chuc-danh-id'] = cookies.get('authState').chucDanhId;
        }
        return req;
      }
    ]
  },

  onSuccess: ({ action, next, response }, options) => {
    const nextAction = {
      type: getActionTypes(action, options)[1],
      payload: response.data,
      meta: {
        previousAction: action
      }
    };
    next(nextAction);
    return nextAction;
  },
  onError: ({
    action, next, error, dispatch
  }, options) => {
    if (error.response && error.response.status === 401) {
      return dispatch(authLogout());
    }
    let errorObject;
    if (error && !error.response) {
      errorObject = {
        data: error.message,
        status: 0
      };
      if (process.env.NODE_ENV !== 'production') {
        console.error('HTTP Failure in Axios', error);
      }
    } else {
      errorObject = error.response;
    }
    const nextAction = {
      type: getActionTypes(action, options)[2],
      error: errorObject,
      meta: {
        previousAction: action
      }
    };
    next(nextAction);
    return nextAction;
  }
};
