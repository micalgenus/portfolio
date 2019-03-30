import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Divider } from 'semantic-ui-react';

import { Link, InputText } from '@/components';
import { StoreProps } from '@/lib/store';

import { signup } from '@/lib/graphql/user';
import { checkValidEmail, checkValidPassword } from '@/lib/utils/user';

interface Props extends StoreProps {
  goToLogin: () => void;
}

interface State {
  id: string;
  email: string;
  username: string;
  password: string;
  repassword: string;
}

@inject('login')
@observer
export default class SignupPopup extends Component<Props, State> {
  state = {
    id: '',
    email: '',
    username: '',
    password: '',
    repassword: '',
  };

  checkEmail = () => {
    const { email } = this.state;
    if (email && !checkValidEmail(email)) return true;
    return false;
  };

  checkPassword = () => {
    const { password } = this.state;
    if (password && !checkValidPassword(password)) return true;
    return false;
  };

  checkRepassword = () => {
    const { password, repassword } = this.state;
    if (repassword && !checkValidPassword(repassword)) return true;
    if (repassword !== password) return true;
    return false;
  };

  checkValidAllInputs = () => {
    const { id, email, username, password, repassword } = this.state;
    if (!id || !email || !username || !password || !repassword) return false;
    if (!checkValidEmail(email)) return false;
    if (!checkValidPassword(repassword) || password !== repassword) return false;
    return true;
  };

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof State) => {
    this.setState({ [target]: event.target.value } as Pick<State, keyof State>);
  };

  doRegister = () => {
    if (!this.checkValidAllInputs()) alert('error');

    return (
      signup(this.state.id, this.state.username, this.state.email, this.state.password)
        .then(() => {
          this.setState({ id: '', username: '', email: '', password: '', repassword: '' });
          this.props.goToLogin();
        })
        // TODO: Error exception
        .catch(err => console.error(err))
    );
  };

  render() {
    const { hideLoginPopup } = this.props.login || { hideLoginPopup: () => {} };
    return (
      <>
        <div className="local-register input-form">
          <InputText label="ID" onChange={e => this.onChangeText(e, 'id')} />
          <InputText label="Email" error={this.checkEmail()} onChange={e => this.onChangeText(e, 'email')} />
          <InputText label="Username" onChange={e => this.onChangeText(e, 'username')} />
          <InputText label="Password" type="password" error={this.checkPassword()} onChange={e => this.onChangeText(e, 'password')} />
          <InputText label="Re-Password" type="password" error={this.checkRepassword()} onChange={e => this.onChangeText(e, 'repassword')} />

          <Link route="/policy">
            <a className="policy-link" onClick={hideLoginPopup}>
              Terms of use and Privacy policy
            </a>
          </Link>

          <Divider horizontal>Agree</Divider>

          <Button disabled={!this.checkValidAllInputs()} fluid color="blue" className="login-button" onClick={this.doRegister}>
            REGISTER
          </Button>
        </div>
      </>
    );
  }
}
