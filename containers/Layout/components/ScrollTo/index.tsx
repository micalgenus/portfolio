import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Icon } from 'semantic-ui-react';

import { StoreProps } from '@/lib/store';

import './styles/scroll.css';

@inject('scroll')
@observer
export default class ScrollTo extends Component<StoreProps> {
  onClickUp = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  onClickDown = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scroll({ top: this.props.scroll && this.props.scroll.height, left: 0, behavior: 'smooth' });
  };

  render() {
    const { height, scrollY } = this.props.scroll || { height: 0, scrollY: 0 };
    const percent = (scrollY / height) * 100;
    const arrow = percent > 5 ? (percent > 95 ? 'scroll-position-bottom' : 'none') : 'scroll-position-top';
    return (
      <div className={`scroll-to-component ${arrow}`}>
        <Icon id="to-top" onClick={this.onClickUp} circular size="mini" name="angle up" />
        <Icon id="to-bottom" onClick={this.onClickDown} circular size="mini" name="angle down" />
      </div>
    );
  }
}
