import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, Icon, Divider } from 'semantic-ui-react';

import { Swiper, InputText } from '@/components';
import { StoreProps } from '@/lib/store';
import { login } from '@/lib/graphql/user';
import { checkValidPassword } from '@/lib/utils/user';

import SignupPopup from './SignupPopup';

import './LoginPopup.scss';

interface State {
  id: string;
  password: string;
}

@inject('login')
@observer
export default class LoginPopup extends Component<StoreProps, State> {
  swiper?: Swiper;
  state = { id: '', password: '' };

  checkPassword = () => {
    const { password } = this.state;
    if (password && !checkValidPassword(password)) return true;
    return false;
  };

  checkValidAllInputs = () => {
    const { id, password } = this.state;
    if (!id || !password) return false;
    if (!checkValidPassword(password)) return false;
    return true;
  };

  doLogin = () => {
    // do login
    login(this.state.id, this.state.password)
      .then(data => {
        if (this.props.login) {
          this.props.login.login(data.login);
          this.closePopup();
        } else {
          // TODO: Error exception
        }
      })

      // TODO: Error exception
      .catch(err => console.error(err));
  };

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof State) => {
    this.setState({ [target]: event.target.value } as Pick<State, keyof State>);
  };

  changeSwiperPageToPrev = () => {
    this.swiper && this.swiper.pre();
  };

  closePopup = () => {
    const { hideLoginPopup } = this.props.login || { hideLoginPopup: () => {} };
    this.setState({ id: '', password: '' });
    hideLoginPopup();
  };

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

  renderLocalLogin = () => (
    <div className="local-login">
      <InputText label="ID" onChange={e => this.onChangeText(e, 'id')} />
      <InputText label="Password" type="password" error={this.checkPassword()} onChange={e => this.onChangeText(e, 'password')} />

      <div className="account-helper">
        <div className="checkbox-form">
          <input type="checkbox" name="checkbox" value="value" />
          <label>Remember Me</label>
        </div>
        {/* <a>Forgot your password?</a> */}
      </div>

      <Button disabled={!this.checkValidAllInputs()} fluid color="blue" className="login-button" onClick={this.doLogin}>
        LOGIN
      </Button>
    </div>
  );

  renderSwiperPreButton = () => {
    return (
      <a className="swiper-pre-icon" onClick={() => this.swiper && this.swiper.pre()}>
        <Icon name="arrow left" size="large" color="grey" />
      </a>
    );
  };

  render() {
    const { loginPopup } = this.props.login || { loginPopup: false };
    return (
      <Modal closeIcon dimmer="blurring" size="mini" open={loginPopup} closeOnEscape={true} closeOnDimmerClick={false} onClose={this.closePopup}>
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
              <SignupPopup goToLogin={this.changeSwiperPageToPrev} />
            </div>
          </Swiper>
        </Modal.Content>
      </Modal>
    );
  }
}
