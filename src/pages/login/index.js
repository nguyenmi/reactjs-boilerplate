import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { LoadingWrapper } from '../../components/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setToken,
  getInfoUser,
  authLogout
} from '../../actions';
import PropTypes from 'prop-types';

let isMounted = true;

/**
 * Set isMounted
 * @param {boolean} value
 */
const setIsMounted = (value = true) => {
  isMounted = value;
  return isMounted;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoginForm: true
    };
    setIsMounted(true);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    setIsMounted(false);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoadingWrapper loading={!this.state.isShowLoginForm} params={{ type: 'container' }}>
        <div className="login-layout">
          <div className="box-login">
            <h1 className="center">Login</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
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
    authLogout
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
