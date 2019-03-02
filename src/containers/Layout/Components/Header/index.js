import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ScrollPosition from '@/Components/ScrollPosition';

import './Header.scss';

export default class LayoutHeader extends Component {
  render() {
    return (
      <header style={{ top: -this.props.header || 0 }}>
        <div className="blur" />
        <nav>
          <div>
            <Link to="/" onClick={() => this.props.changePath('/')}>
              Han GyeongSu's Portfolio
            </Link>
          </div>

          <ul>
            {this.props.routers.map((router, idx) =>
              router.path && router.path !== '/' ? (
                <li key={idx}>
                  <Link to={router.path} onClick={() => this.props.changePath(router.path)}>
                    {router.title}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </nav>
        <ScrollPosition top={60} scroll={this.props.scroll} height={this.props.height} />
      </header>
    );
  }
}

LayoutHeader.defaultProps = {
  routers: [],
  scroll: 0,
  height: 0,
};

LayoutHeader.propTypes = {
  routers: PropTypes.array,
  scroll: PropTypes.number,
  height: PropTypes.number,
};
