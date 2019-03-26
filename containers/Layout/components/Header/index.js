import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from '@/routes';

import { ScrollBar } from '@/components';

import './styles/header.scss';

const HEADER_HEIGHT = 60;

@inject('scroll')
@observer
class LayoutHeader extends Component {
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
