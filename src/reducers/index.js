import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import common from './common';
import auth from './auth';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  common,
  auth
});

export default rootReducer;
