import { observable, action } from 'mobx';
import { User } from '@/interfaces';
import { setLoginToken, removeLoginToken, setRememberLoginToken, removeRememberLoginToken } from '@/lib/utils/cookie';
import { getUserInfo, rememberLogin } from '@/lib/graphql/user';

export class LoginStore {
  @observable loginPopup: boolean = false;
  @observable authentication: string = '';
  @observable rememberToken: string = '';
  @observable userInformation: User = {};

  @action showLoginPopup = () => {
    this.loginPopup = true;
  };

  @action hideLoginPopup = () => {
    this.loginPopup = false;
  };

  @action rememberLogin = (token: string) => {
    setRememberLoginToken(token);
    this.rememberToken = token;

    rememberLogin(token).then(login => this.login(login || ''));
  };

  @action login = (token: string) => {
    setLoginToken(token);
    this.authentication = token;
    getUserInfo()
      .then((userinfo: { me: User }) => (this.userInformation = userinfo.me))
      .catch(() => this.rememberLogin(this.rememberToken))
      .catch(() => this.logout());
  };

  @action logout = () => {
    this.authentication = '';
    this.rememberToken = '';
    this.userInformation = {};
    removeLoginToken();
    removeRememberLoginToken();
  };
}

export default new LoginStore();
