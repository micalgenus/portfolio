import { observable, action } from 'mobx';

class ScrollStore {
  @observable scrollY = 0;
  @observable movedScrollY = 0;
  @observable height = 0;

  @action changeScrollY = scrollY => {
    const nextScrollY = scrollY >= 0 ? (scrollY <= this.height ? scrollY : this.height) : 0;
    const movedValue = nextScrollY - this.scrollY; // current - pre

    this.movedScrollY = (movedValue > 0 && this.movedScrollY > 0) || (movedValue < 0 && this.movedScrollY < 0) ? this.movedScrollY + movedValue : movedValue;
    this.scrollY = nextScrollY;
  };

  @action changeWindowHeight = height => {
    this.height = height >= 0 ? height : 0;
  };
}

export default new ScrollStore();
