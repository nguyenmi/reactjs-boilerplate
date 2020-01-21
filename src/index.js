import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import { createBrowserHistory } from 'history';
import Root from './Root';
import { routes } from './routes';
import { Modal } from 'antd';

const store = configureStore();
const browserHistory = createBrowserHistory();

browserHistory.listen(() => {
  Modal.destroyAll();
});

ReactDOM.render((
  <Root
    history={history}
    routes={routes}
    store={store}
  />
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
