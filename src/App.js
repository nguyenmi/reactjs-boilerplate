import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import viVN from 'antd/lib/locale-provider/vi_VN';
import { RenderRoutes } from './routes';
import './assets/style/main.scss';
import 'moment/locale/vi';
import { isEmpty } from 'lodash';
import Helpers from './helpers';
import {
  getInfoUser,
  authLogout
} from './actions';
import { LoadingWrapper } from './components/common';
import messages from './constants/variables';
import { ConfigProvider } from 'antd';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  /**
   * Get thông tin user khi reload APP
   * @returns {void} Gọi API /me
   * @memberof App
   */
  getUserInfo = async () => {
    try {
      const token = Helpers.get(this.props.auth, 'token');
      if (isEmpty(token)) {
        return;
      }
      const response = await this.props.actions.getInfoUser();
      if (!isEmpty(response.error)) {
        Helpers.throwError(response.error);
      }
      this.props.history.push('/');
    } catch (error) {
      // set location.state.error để show ở login form
      await this.props.history.replace({ state: { error: messages.LOGIN_FAILED } });
      // logout
      await this.props.actions.authLogout();
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Set state Loading
   * @param {boolean} loading
   * @return state
   * @memberof App
   */
  setLoading = (loading = false) => {
    this.setState({ loading });
  }

  render() {
    const {
      routes,
      history
    } = this.props;
    return (
      <LoadingWrapper loading={this.state.loading || this.props.loadingApp} params={{ type: 'container' }}>
        <ConfigProvider locale={viVN}>
          <RenderRoutes
            history={history}
            routes={routes}
          />
        </ConfigProvider>
      </LoadingWrapper>
    );
  }
}

App.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  actions: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  loadingApp: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  location: state.router.location,
  loadingApp: state.common.loadingApp,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getInfoUser,
    authLogout
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
