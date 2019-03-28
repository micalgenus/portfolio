import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Divider } from 'semantic-ui-react';

import { Link } from '@/components';
import { StoreProps } from '@/stores';

interface State {
  id: string;
  username: string;
  password: string;
  repassword: string;
}

@inject('login')
@observer
export default class SignupPopup extends Component<StoreProps, State> {
  state = {
    id: '',
    username: '',
    password: '',
    repassword: '',
  };

  checkValidPassword = (password: string) => password.length >= 8 && true;

  checkPassword = () => {
    const { password } = this.state;
    if (password && !this.checkValidPassword(password)) return true;
    return false;
  };

  checkRepassword = () => {
    const { password, repassword } = this.state;
    if (repassword && !this.checkValidPassword(repassword)) return true;
    if (repassword !== password) return true;
    return false;
  };

  checkValidAllInputs = () => {
    const { id, username, password, repassword } = this.state;
    if (!id || !username || !password || !repassword) return false;
    if (!this.checkValidPassword(repassword) || password !== repassword) return false;
    return true;
  };

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof State) => {
    this.setState({ [target]: event.target.value } as Pick<State, keyof State>);
  };

  render() {
    const { hideLoginPopup } = this.props.login || { hideLoginPopup: () => {} };
    return (
      <>
        <div className="local-register input-form">
          <label>
            <input placeholder=" " onChange={e => this.onChangeText(e, 'id')} />
            <span>ID</span>
          </label>
          <label>
            <input placeholder=" " onChange={e => this.onChangeText(e, 'username')} />
            <span>Username</span>
          </label>
          <label>
            <input placeholder=" " type="password" className={this.checkPassword() ? 'error' : ''} onChange={e => this.onChangeText(e, 'password')} />
            <span>Password</span>
          </label>
          <label>
            <input placeholder=" " type="password" className={this.checkRepassword() ? 'error' : ''} onChange={e => this.onChangeText(e, 'repassword')} />
            <span>Re-Password</span>
          </label>

          <Link route="/policy">
            <a className="policy-link" onClick={hideLoginPopup}>
              Terms of use and Privacy policy
            </a>
          </Link>

          <Divider horizontal>Agree</Divider>

          <Button disabled={!this.checkValidAllInputs()} fluid color="blue" className="login-button">
            REGISTER
          </Button>
        </div>
      </>
    );
  }
}
