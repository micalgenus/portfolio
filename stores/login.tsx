import { observable, action } from 'mobx';

export class LoginStore {
  @observable loginPopup: boolean = false;

  @action showLoginPopup = () => {
    console.log('showLoginPopup');
    this.loginPopup = true;
  };

  @action hideLoginPopup = () => {
    console.log('hideLoginPopup');
    this.loginPopup = false;
  };
}

export default new LoginStore();
