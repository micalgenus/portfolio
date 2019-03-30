import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Divider } from 'semantic-ui-react';

import { Link, InputText } from '@/components';
import { StoreProps } from '@/lib/store';

import { signup } from '@/lib/graphql/user';
import { checkValidEmail, checkValidPassword } from '@/lib/utils/user';

type AllowError = 'Exist user id' | 'Exist user email' | 'Invalid id';
const ErrorMessages = new Map<keyof InputState, AllowError[]>([['id', ['Exist user id', 'Invalid id']], ['email', ['Exist user email']]]);

interface Props extends StoreProps {
  goToLogin: () => void;
}

interface InputState {
  id: string;
  email: string;
  username: string;
  password: string;
  repassword: string;
}

interface State extends InputState {
  error: AllowError[];
}

@inject('login')
@observer
export default class SignupPopup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: '',
      email: '',
      username: '',
      password: '',
      repassword: '',
      error: [],
    };
  }

  checkId = () => {
    const { error } = this.state;
    const errors = ErrorMessages.get('id') || [];
    for (const e of errors) if (error.includes(e)) return false;
    return true;
  };

  checkEmail = () => {
    const { email } = this.state;
    if (!this.existEmail()) return false;
    if (email && !checkValidEmail(email)) return false;
    return true;
  };

  existEmail = () => {
    const { error } = this.state;
    const errors = ErrorMessages.get('email') || [];
    for (const e of errors) if (error.includes(e)) return false;
    return true;
  };

  checkPassword = () => {
    const { password } = this.state;
    if (password && !checkValidPassword(password)) return false;
    return true;
  };

  checkRepassword = () => {
    const { password, repassword } = this.state;
    if (repassword && !checkValidPassword(repassword)) return false;
    if (repassword !== password) return false;
    return true;
  };

  checkValidAllInputs = () => {
    const { id, email, username, password, repassword } = this.state;
    if (!id || !email || !username || !password || !repassword) return false;
    if (!checkValidEmail(email)) return false;
    if (!checkValidPassword(repassword) || password !== repassword) return false;
    return true;
  };

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof InputState) => {
    this.setState({ [target]: event.target.value } as Pick<InputState, keyof InputState>);
    const errors = ErrorMessages.get(target) || [];
    this.setState({ error: this.state.error.filter(v => !errors.includes(v)) });
  };

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.doRegister();
    }
  };

  doRegister = () => {
    if (!this.checkValidAllInputs()) return;

    signup(this.state.id, this.state.username, this.state.email, this.state.password)
      .then(() => {
        this.setState({ id: '', username: '', email: '', password: '', repassword: '' });
        this.props.goToLogin();
      })
      .catch(err => {
        let error: AllowError[] = [...this.state.error];

        for (const e of err) {
          error.push(e.message);
        }

        this.setState({ error: [...new Set<AllowError>(error)] });
      });
  };

  render() {
    const { error } = this.state;
    const { hideLoginPopup } = this.props.login || { hideLoginPopup: () => {} };
    return (
      <>
        <div className="local-register input-form">
          <InputText
            label="ID"
            error={!this.checkId()}
            errorMessage={error.includes('Invalid id') ? 'Invalid id' : 'Exist id'}
            onChange={e => this.onChangeText(e, 'id')}
            onKeyPress={this.onKeyPress}
          />
          <InputText
            label="Email"
            error={!this.checkEmail()}
            errorMessage={this.existEmail() ? 'Invalid email' : 'Exist email'}
            onChange={e => this.onChangeText(e, 'email')}
            onKeyPress={this.onKeyPress}
          />
          <InputText label="Username" onChange={e => this.onChangeText(e, 'username')} onKeyPress={this.onKeyPress} />
          <InputText
            label="Password"
            type="password"
            error={!this.checkPassword()}
            errorMessage="Please check password.\nPassword must be at least 8 characters long."
            onChange={e => this.onChangeText(e, 'password')}
            onKeyPress={this.onKeyPress}
          />
          <InputText
            label="Re-Password"
            type="password"
            error={!this.checkRepassword()}
            errorMessage="Password does not match."
            onChange={e => this.onChangeText(e, 'repassword')}
            onKeyPress={this.onKeyPress}
          />

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
