import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, Icon, Divider } from 'semantic-ui-react';

import { Swiper } from '@/components';
import { StoreProps } from '@/stores';

import SignupPopup from './SignupPopup';

import './LoginPopup.scss';

@inject('login')
@observer
export default class LoginPopup extends Component<StoreProps> {
  swiper?: Swiper;

  doLogin = () => {
    // do login
  };

  renderLocalLogin = () => (
    <div className="local-login input-form">
      <label>
        <input placeholder=" " />
        <span>ID</span>
      </label>
      <label>
        <input placeholder=" " type="password" />
        <span>Password</span>
      </label>

      <div className="account-helper">
        <div className="checkbox-form">
          <input type="checkbox" name="checkbox" value="value" />
          <label>Remember Me</label>
        </div>
        {/* <a>Forgot your password?</a> */}
      </div>

      <Button disabled fluid color="blue" className="login-button">
        LOGIN
      </Button>
    </div>
  );

  renderSocialLogin = () => {
    return (
      <div className="social-login">
        <Button fluid color="blue" onClick={() => this.swiper && this.swiper.next()}>
          Signup
        </Button>
        <Button icon labelPosition="left" fluid color="black">
          <Icon size="large" inverted name="github" />
          Github
        </Button>
      </div>
    );
  };

  renderSwiperPreButton = () => {
    return (
      <a className="swiper-pre-icon" onClick={() => this.swiper && this.swiper.pre()}>
        <Icon name="arrow left" size="large" color="grey" />
      </a>
    );
  };

  render() {
    const { loginPopup, hideLoginPopup } = this.props.login || { loginPopup: false, hideLoginPopup: () => {} };
    return (
      <Modal closeIcon dimmer="blurring" size="mini" open={loginPopup} closeOnEscape={true} closeOnDimmerClick={false} onClose={hideLoginPopup}>
        <Modal.Content>
          <Swiper ref={ref => (this.swiper = ref || undefined)}>
            <div className="login-container">
              <h3>Login</h3>
              {this.renderLocalLogin()}
              <Divider horizontal>Or</Divider>
              {this.renderSocialLogin()}
            </div>
            <div className="signup-container">
              <div className="swiper-pre-icon-box">
                {this.renderSwiperPreButton()}
                <h3>Signup</h3>
              </div>
              <SignupPopup />
            </div>
          </Swiper>
        </Modal.Content>
      </Modal>
    );
  }
}
