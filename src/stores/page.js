import { observable, action } from 'mobx';

class PageStore {
  @observable currentPath = window.location.pathname || '/';
  @observable loadingPages = [];

  @action changePath = path => {
    this.currentPath = path;
  };

  @action startLoadPage = pageName => {
    if (!this.loadingPages.find(v => v === pageName)) this.loadingPages = [...this.loadingPages, pageName];
  };

  @action endLoadPage = pageName => {
    this.loadingPages.remove(pageName);
  };
}

export default new PageStore();
