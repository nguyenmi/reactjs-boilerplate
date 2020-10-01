import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { Cookies } from 'react-cookie';
import { camelizeKeys } from 'humps';
import {
  isEmpty,
  get
} from 'lodash';
import { MasterLayout, LoginLayout } from '..//components/layouts';
import variables from '../constants/variables';
import ConnectedSwitch from './ConnectedSwitch';

const cookies = new Cookies();

const renderComponent = (route, props) => {
  if (isEmpty(route)) {
    return null;
  }
  const { layout = variables.TYPE_LAYOUT.MASTER } = route;
  // hiển thị component được bọc bởi MasterLayout
  if (layout === variables.TYPE_LAYOUT.MASTER) {
    return (
      <MasterLayout {...props}>
        <route.component
          {...props}
          routes={route.routes}
        />
      </MasterLayout>
    );
  }
  // hiển thị component được bọc bởi LoginLayout
  if (layout === variables.TYPE_LAYOUT.LOGIN) {
    return (
      <LoginLayout {...props}>
        <route.component
          {...props}
          routes={route.routes}
        />
      </LoginLayout>
    );
  }
  return (
    <route.component
      {...props}
      routes={route.routes}
    />
  );
};

const RenderRoutes = ({
  routes,
  auth,
  location
}) => {
  const query = QueryString.parse(location.hash);
  let token;
  const hasQueryParams = !isEmpty(query);
  if (hasQueryParams) {
    token = camelizeKeys(query);
  }
  const authState = cookies.get('authState');
  const path = get(location, 'pathname');
  const error = get(location, 'state.error');
  const accessToken = token
    || get(auth, 'token')
    || get(authState, 'token');
  if (!routes) {
    return null;
  }
  return (
    <ConnectedSwitch>
      { routes.map((route, i) => (
        <Route
          key={i}
          exact
          path={route.path}
          render={props => (
            <React.Fragment>
              {
                (
                  hasQueryParams || (
                    path !== variables.LOGIN_ROUTE && route.isRequiredLogin !== false && !accessToken
                  )
                ) && (
                  <Redirect
                    to={{
                      pathname: variables.LOGIN_ROUTE,
                      state: { token, error }
                    }}
                  />
                )
              }
              {
                (
                  route.isRequiredLogin === false
                  || auth.token
                  || !route.path
                  || variables.LOGIN_ROUTE === route.path
                ) && renderComponent(route, { ...props })
              }
            </React.Fragment>
          )}
        />
      ))}
    </ConnectedSwitch>
  );
};

RenderRoutes.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  routes: PropTypes.arrayOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, null)(RenderRoutes));
