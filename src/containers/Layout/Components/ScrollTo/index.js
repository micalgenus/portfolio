import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import './ScrollTo.scss';

export default class ScrollTo extends Component {
  onClickUp = e => {
    e.preventDefault();
    window.scroll(0, 0);
  };

  onClickDown = e => {
    e.preventDefault();
    window.scroll(0, this.props.height);
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
