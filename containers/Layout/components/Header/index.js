import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from '@/routes';

import { ScrollBar } from '@/components';

import './styles/header.scss';

const HEADER_HEIGHT = 60;

@inject('scroll')
@observer
class LayoutHeader extends Component {
  renderScrollBar = () => {
    const { top, scroll, height } = this.props;
    const H = height >= 1 ? height : 1;
    const S = scroll <= H ? (scroll > 0 ? scroll : 0) : height;

    return (
      <div className="scroll-component progress-container" id="progress-container" style={{ top }}>
        <div className="progress-bar" id="page-status" style={{ width: `${(S / H) * 100}%` }} />
      </div>
    );
  };

  render() {
    const { movedScrollY, scrollY, height } = this.props.scroll;

    return (
      <header style={{ top: movedScrollY > 0 ? -HEADER_HEIGHT : 0 }}>
        <nav>
          <div>
            <Link to="/">
              <a>Han GyeongSu's Portfolio</a>
            </Link>
          </div>
          <ul />
        </nav>
        <ScrollBar top={HEADER_HEIGHT} scroll={scrollY} height={height} />
      </header>
    );
  }
}

export default LayoutHeader;
