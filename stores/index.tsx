import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import scroll, { ScrollStore } from './scroll';

export interface StoreProps {
  scroll?: ScrollStore;
}

export default class StoreProvider extends Component {
  render() {
    return <Provider scroll={scroll}>{this.props.children}</Provider>;
  }
}
