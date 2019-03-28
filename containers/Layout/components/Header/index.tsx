import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { ScrollBar, Link } from '@/components';
import { StoreProps } from '@/lib/store';

import './styles/header.scss';

const HEADER_HEIGHT = 60;

@inject('login')
@inject('scroll')
@observer
class LayoutHeader extends Component<StoreProps> {
  render() {
    const { movedScrollY, scrollY, height } = this.props.scroll || { movedScrollY: 0, scrollY: 0, height: 0 };
    const { showLoginPopup } = this.props.login || {
      showLoginPopup: () => console.error('showLoginPopop Error'),
    };

    return (
      <header style={{ top: movedScrollY > 0 ? -HEADER_HEIGHT : 0 }}>
        <nav>
          <div>
            <Link route="/">
              <a>Han GyeongSu's Portfolio</a>
            </Link>
          </div>
          <ul>
            <li>
              <a onClick={showLoginPopup}>Login</a>
            </li>
          </ul>
        </nav>
        <ScrollBar top={HEADER_HEIGHT} scroll={scrollY} height={height} />
      </header>
    );
  }
}

export default LayoutHeader;
