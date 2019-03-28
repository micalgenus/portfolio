import { observable, action } from 'mobx';

export class LoginStore {
  @observable loginPopup: boolean = false;

  @action showLoginPopup = () => {
    this.loginPopup = true;
  };

  @action hideLoginPopup = () => {
    this.loginPopup = false;
  };
}

export default new LoginStore();
