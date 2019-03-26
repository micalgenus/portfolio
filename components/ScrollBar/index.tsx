import React, { Component } from 'react';

import './ScrollBar.scss';

interface Props {
  top: number;
  scroll: number;
  height: number;
}

export default class ScrollBar extends Component<Props> {
  render() {
    const { top, scroll, height } = this.props;
    const H = height >= 1 ? height : 1;
    const S = scroll <= H ? (scroll > 0 ? scroll : 0) : height;

    return (
      <div className="scroll-component progress-container" id="progress-container" style={{ top }}>
        <div className="progress-bar" id="page-status" style={{ width: `${(S / H) * 100}%` }} />
      </div>
    );
  }
}
