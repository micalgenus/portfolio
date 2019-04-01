import React, { Component, FormEvent } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Divider } from 'semantic-ui-react';

import { Link, InputText } from '@/components';
import { StoreProps } from '@/lib/store';

import { signup } from '@/lib/graphql/user';
import { checkValidEmail, checkValidPassword } from '@/lib/utils/user';

type AllowError = 'Exist user id' | 'Exist user email' | 'Invalid id' | 'Invalid password';
const ErrorMessages = new Map<keyof InputState, AllowError[]>([
  ['id', ['Exist user id', 'Invalid id']],
  ['email', ['Exist user email']],
  ['password', ['Invalid password']],
]);

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
    const { password, error } = this.state;
    const errors = ErrorMessages.get('password') || [];
    for (const e of errors) if (error.includes(e)) return false;
    if (password && !checkValidPassword(password)) return false;
    return true;
  };

  checkRepassword = () => {
    const { password, repassword, error } = this.state;
    const errors = ErrorMessages.get('password') || [];
    for (const e of errors) if (error.includes(e)) return false;
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

  doRegister = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

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

  renderInputText = (label: string, type: string, error: boolean, errorMessage: string, onChange: keyof InputState) => (
    <InputText
      label={label}
      type={type}
      error={error}
      errorMessage={errorMessage}
      onChange={e => this.onChangeText(e, onChange)}
      onKeyPress={this.onKeyPress}
    />
  );

  render() {
    const { error } = this.state;
    const { hideLoginPopup } = this.props.login || { hideLoginPopup: () => {} };
    return (
      <form className="local-register input-form" onSubmit={this.doRegister}>
        {this.renderInputText('ID', 'text', !this.checkId(), error.includes('Invalid id') ? 'Invalid id' : 'Exist id', 'id')}
        {this.renderInputText('Email', 'text', !this.checkEmail(), this.existEmail() ? 'Invalid email' : 'Exist email', 'email')}
        {this.renderInputText('Username', 'text', false, '', 'username')}
        {this.renderInputText(
          'Password',
          'password',
          !this.checkPassword(),
          'Please check password.\nPassword must be at least 8 characters long.',
          'password'
        )}
        {this.renderInputText('Re-Password', 'password', !this.checkRepassword(), 'Password does not match.', 'repassword')}

        <Link route="/policy">
          <a className="policy-link" onClick={hideLoginPopup}>
            Terms of use and Privacy policy
          </a>
        </Link>

        <Divider horizontal>Agree</Divider>

        <Button disabled={!this.checkValidAllInputs()} fluid color="blue" className="login-button">
          REGISTER
        </Button>
      </form>
    );
  }
}
