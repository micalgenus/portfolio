import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusBar from '@/Containers/StatusBar';

import { appendPrefix } from '@/Router';

import './Header.scss';

export default class LayoutHeader extends Component {
  onChangeRoute = link => {
    this.props.changePath(link);

    window.scroll(0, 0);
    this.props.showLoading();
  };

  render() {
    const rootUrl = appendPrefix('/');

    return (
      <header style={{ top: -this.props.header || 0 }}>
        <div className="blur" />
        <nav>
          <div>
            <Link to={rootUrl} onClick={() => this.onChangeRoute(rootUrl)}>
              Han GyeongSu's Portfolio
            </Link>
          </div>

          <ul>
            {this.props.routers.map((router, idx) =>
              router.path && router.path !== rootUrl ? (
                <li key={idx}>
                  <Link className={router.path === this.props.path ? 'active' : 'non-active'} to={router.path} onClick={() => this.onChangeRoute(router.path)}>
                    {router.title}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </nav>
        <StatusBar top={60} />
      </header>
    );
  }
}

LayoutHeader.defaultProps = {
  routers: [],
};

LayoutHeader.propTypes = {
  routers: PropTypes.array,
};
