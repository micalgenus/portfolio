import React, { Component, FormEvent } from 'react';
import { observer, inject } from 'mobx-react';
import getConfig from 'next/config';
import { Button, Modal, Icon, Divider } from 'semantic-ui-react';

import { Swiper, InputText } from '@/components';
import { StoreProps } from '@/lib/store';
import { login } from '@/lib/graphql/user';
import { checkValidPassword } from '@/lib/utils/user';

import OAuthLoginButton from './OAuthPopup';

import SignupPopup from './SignupPopup';

import './LoginPopup.css';

const { publicRuntimeConfig } = getConfig();
const { GITHUB_OAUTH_CLIENT_ID } = publicRuntimeConfig;

type AllowError = 'No user with that id' | 'Incorrect password';
const ErrorMessages = new Map<keyof InputState, AllowError[]>([['id', ['No user with that id']], ['password', ['Incorrect password']]]);

interface InputState {
  id: string;
  password: string;
}

interface State extends InputState {
  remember: boolean;
  error: AllowError[];
}

@inject('login')
@observer
export default class LoginPopup extends Component<StoreProps, State> {
  swiper?: Swiper;
  constructor(props: StoreProps) {
    super(props);

    this.state = {
      id: '',
      password: '',
      remember: false,
      error: [],
    };
  }

  checkId = () => {
    const { error } = this.state;
    const errors = ErrorMessages.get('id') || [];
    for (const e of errors) if (error.includes(e)) return false;

    return true;
  };

  checkPassword = () => {
    const { password, error } = this.state;
    const errors = ErrorMessages.get('password') || [];
    for (const e of errors) if (error.includes(e)) return false;
    if (password && !checkValidPassword(password)) return false;

    return true;
  };

  checkValidAllInputs = () => {
    const { id, password, error } = this.state;
    if (!id || !password) return false;
    if (!checkValidPassword(password)) return false;
    if (error.length) return false;
    return true;
  };

  doLogin = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!this.checkValidAllInputs()) return;

    // do login
    login(this.state.id, this.state.password, this.state.remember)
      .then(data => {
        if (this.props.login) {
          if (data.rememberMe) this.props.login.rememberLogin(data.rememberMe);
          else if (data.login) this.props.login.login(data.login);
          // TODO: Error exception
          else return;

          this.closePopup();
        } else {
          // TODO: Error exception
        }
      })
      .catch(err => {
        let error: AllowError[] = [...this.state.error];

        for (const e of err) {
          error.push(e.message);
        }

        this.setState({ error: [...new Set<AllowError>(error)] });
      });
  };

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof InputState) => {
    this.setState({ [target]: event.target.value } as Pick<InputState, keyof InputState>);
    const errors = ErrorMessages.get(target) || [];
    this.setState({ error: this.state.error.filter(v => !errors.includes(v)) });
  };

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.doLogin();
    }
  };

  changeSwiperPageToPrev = () => {
    this.swiper && this.swiper.pre();
  };

  toggleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ remember: e.target.checked });
  };

  closePopup = () => {
    const { hideLoginPopup } = this.props.login || { hideLoginPopup: () => {} };
    this.setState({ id: '', password: '' });
    hideLoginPopup();
  };

  OAuthLoginPopupCallback = () => {
    // window.location.reload();
    this.closePopup();
  };

  renderSocialLogin = () => {
    return (
      <div className="social-login">
        <Button fluid color="blue" onClick={() => this.swiper && this.swiper.next()}>
          Signup
        </Button>
        {GITHUB_OAUTH_CLIENT_ID ? (
          <OAuthLoginButton
            path={`https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENT_ID}&scope=user`}
            label="Github"
            icon="github"
            backgroundColor="black"
            color="white"
            callback={this.OAuthLoginPopupCallback}
          />
        ) : null}
      </div>
    );
  };

  renderLocalLogin = () => (
    <form className="local-login" onSubmit={this.doLogin}>
      <InputText label="ID" error={!this.checkId()} errorMessage="Please check ID." onChange={e => this.onChangeText(e, 'id')} onKeyPress={this.onKeyPress} />
      <InputText
        label="Password"
        type="password"
        error={!this.checkPassword()}
        errorMessage="Please check password.\nPassword must be at least 8 characters long."
        onChange={e => this.onChangeText(e, 'password')}
        onKeyPress={this.onKeyPress}
      />

      <div className="account-helper">
        <div className="checkbox-form">
          <input type="checkbox" name="checkbox" value="value" onChange={this.toggleRemember} />
          <label>Remember Me</label>
        </div>
      </div>

      <Button disabled={!this.checkValidAllInputs()} fluid color="blue" className="login-button">
        LOGIN
      </Button>
    </form>
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
