import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, Icon, Divider } from 'semantic-ui-react';

import { StoreProps } from '@/stores';

import './LoginPopup.scss';

@inject('login')
@observer
export default class LoginPopup extends Component<StoreProps> {
  doLogin = () => {
    // do login
  };

  render() {
    const { loginPopup, hideLoginPopup } = this.props.login || { loginPopup: false, hideLoginPopup: () => {} };
    return (
      <Modal closeIcon dimmer="blurring" size="mini" open={loginPopup} closeOnEscape={true} closeOnDimmerClick={false} onClose={hideLoginPopup}>
        <Modal.Content>
          <h3>Login</h3>
          <div className="local-login">
            <label>
              <input placeholder=" " />
              <span>Username</span>
            </label>
            <label>
              <input placeholder=" " type="password" />
              <span>Password</span>
            </label>

            <div className="account-helper">
              <div className="remember-box">
                <input type="checkbox" name="checkbox" value="value" />
                <label>Remember Me</label>
              </div>
              <a>Forgot your password?</a>
            </div>

            <Button disabled fluid color="blue" className="login-button">
              LOGIN
            </Button>
            {/* <div className="account-signup">
              <a>Create new account?</a>
            </div> */}
          </div>
          <Divider horizontal>Or</Divider>

          <div className="social-login">
            <Button fluid color="blue">
              Signup
            </Button>
            {/* <Button icon labelPosition="left" fluid color="red">
              <Icon size="large" inverted name="google plus g" />
              Google
            </Button> */}
            <Button icon labelPosition="left" fluid color="black">
              <Icon size="large" inverted name="github" />
              Github
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}