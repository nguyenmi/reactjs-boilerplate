import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { LoadingWrapper } from '../../components/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setToken,
  getInfoUser,
  authLogout,
  signin
} from '../../actions';
import PropTypes from 'prop-types';
import Helpers from '../../helpers';
import { isEmpty } from 'lodash';
import { messages } from '../../constants/messages';

let isMounted = true;

/**
 * Set isMounted
 * @param {boolean} value
 */
const setIsMounted = (value = true) => {
  isMounted = value;
  return isMounted;
};

/**
 * Get isMounted
 */
const getIsMounted = () => isMounted;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: undefined,
      isSubmitting: false,
    };
    setIsMounted(true);
  }

  componentDidMount() {}

  componentWillUnmount() {
    setIsMounted(false);
  }

  handleLogin = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
      return this.validateSuccessNext(values);
    });
  }

  validateSuccessNext = async (values) => {
    try {
      await this.setStateData({ isSubmitting: true });
      const data = {
        ...values
      }
      const response = await this.props.actions.signin(data);
      if (!isEmpty(Helpers.get(response, 'error')) || isEmpty(Helpers.get(response, 'payload'))) {
        Helpers.throwError(Helpers.get(response, 'error', messages.LOGIN_FAILED));
      }
      console.log(response.payload.data.attributes.accessToken);
      await this.props.actions.setToken(response.payload.data.attributes.accessToken);
      this.getMe();
    } catch (error) {
      this.setStateData({
        isSubmitting: false,
        notification: messages.LOGIN_FAILED
      });
    }
  }

  getMe = async () => {
    try {
      const response = await this.props.actions.getInfoUser();
      if (!isEmpty(Helpers.get(response, 'error')) || isEmpty(Helpers.get(response, 'payload'))) {
        Helpers.throwError(Helpers.get(response, 'error', messages.LOGIN_FAILED));
      }
      this.props.history.push('/');
    } catch (error) {
      this.setStateData({
        isSubmitting: false,
        notification: messages.LOGIN_FAILED
      });
      this.props.actions.authLogout();
      this.props.history.replace();
    }
  }

  /**
   * Set state properties
   * @param {object} data the data input
   * @param {function} callback the function which will be called after setState
   * @returns {void} call this.setState to update state
   * @memberof Login
   */
  setStateData = (state, callback) => {
    if (!getIsMounted()) {
      return;
    }
    this.setState(state, callback);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoadingWrapper params={{ type: 'container' }}>
        <div className="login-layout">
          <div className="box-login">
            <h1 className="center">Login</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item className="footer-login">
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.state.isSubmitting}
                  onClick={this.handleLogin}
                >
                  Log in
                </Button>
              </Form.Item>
              { this.state.notification && (
                <p className="notifi-login">{this.state.notification}</p>
              )}
            </Form>
          </div>
        </div>
      </LoadingWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setToken,
    getInfoUser,
    authLogout,
    signin
  }, dispatch)
});

Login.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  actions: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Form.create({ name: 'Login' })(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
