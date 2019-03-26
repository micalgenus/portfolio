import { observable, action } from 'mobx';

export class ScrollStore {
  @observable scrollY: number = 0;
  @observable movedScrollY: number = 0;
  @observable height: number = 0;

  @action changeScrollY = (scrollY: number) => {
    const nextScrollY = scrollY >= 0 ? (scrollY <= this.height ? scrollY : this.height) : 0;
    const movedValue = nextScrollY - this.scrollY; // current - pre

    this.movedScrollY = (movedValue > 0 && this.movedScrollY > 0) || (movedValue < 0 && this.movedScrollY < 0) ? this.movedScrollY + movedValue : movedValue;
    this.scrollY = nextScrollY;
  };

  @action changeWindowHeight = (height: number) => {
    this.height = height >= 0 ? height : 0;
  };
}

export default new ScrollStore();
