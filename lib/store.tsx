import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import scroll, { ScrollStore } from './mobx/scroll';
import login, { LoginStore } from './mobx/login';

export interface StoreProps {
  scroll?: ScrollStore;
  login?: LoginStore;
}

export default class StoreProvider extends Component {
  render() {
    return (
      <Provider scroll={scroll} login={login}>
        {this.props.children}
      </Provider>
    );
  }
}
