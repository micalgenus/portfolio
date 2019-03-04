import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusBar from '@/Containers/StatusBar';

import './Header.scss';

export default class LayoutHeader extends Component {
  onChangeRoute = link => {
    this.props.changePath(link);

    window.scroll(0, 0);
    this.props.showLoading();
  };

  render() {
    return (
      <header style={{ top: -this.props.header || 0 }}>
        <div className="blur" />
        <nav>
          <div>
            <Link to="/" onClick={() => this.onChangeRoute('/')}>
              Han GyeongSu's Portfolio
            </Link>
          </div>

          <ul>
            {this.props.routers.map((router, idx) =>
              router.path && router.path !== '/' ? (
                <li key={idx}>
                  <Link to={router.path} onClick={() => this.onChangeRoute(router.path)}>
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
