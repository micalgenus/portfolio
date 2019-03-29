import { observable, action } from 'mobx';
import { User } from '@/interfaces';
import { setLoginToken, removeLoginToken } from '@/lib/utils/cookie';
import { getUserInfo } from '@/lib/graphql/user';

export class LoginStore {
  @observable loginPopup: boolean = false;
  @observable authentication: string = '';
  @observable userInformation: User = {};

  @action showLoginPopup = () => {
    this.loginPopup = true;
  };

  @action hideLoginPopup = () => {
    this.loginPopup = false;
  };

  @action login = (token: string) => {
    setLoginToken(token);
    this.authentication = token;
    getUserInfo()
      .then((userinfo: { me: User }) => (this.userInformation = userinfo.me))
      .catch(err => {
        console.error(err);
        this.logout();
      });
  };

  @action logout = () => {
    this.authentication = '';
    this.userInformation = {};
    removeLoginToken();
  };
}

export default new LoginStore();
