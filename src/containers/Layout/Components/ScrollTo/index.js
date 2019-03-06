import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import './ScrollTo.scss';

export default class ScrollTo extends Component {
  onClickUp = e => {
    e.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  onClickDown = e => {
    e.preventDefault();
    window.scroll({ top: this.props.height, left: 0, behavior: 'smooth' });
  };

  render() {
    const { height, scrollY } = this.props;
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
