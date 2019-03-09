import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusBar from '@/Containers/StatusBar';

import { appendPrefix } from '@/Router';

import './Header.scss';

const HEADER_HEIGHT = 60;

class LayoutHeader extends Component {
  onChangeRoute = link => {
    if (link === this.props.currentPath) return false;
    this.props.changePath(link);

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    this.props.startLoadPage(link);
  };

  renderLink = (route, idx, rootUrl) => {
    return route.path && route.path !== rootUrl ? (
      <li key={idx}>
        <Link className={route.path === this.props.currentPath ? 'active' : 'non-active'} to={route.path} onClick={() => this.onChangeRoute(route.path)}>
          {route.title}
        </Link>
      </li>
    ) : null;
  };

  render() {
    const rootUrl = appendPrefix('/');
    const { movedScrollY } = this.props;

    return (
      <header style={{ top: movedScrollY > 0 ? -HEADER_HEIGHT : 0 }}>
        <div className="blur" />
        <nav>
          <div>
            <Link to={rootUrl} onClick={() => this.onChangeRoute(rootUrl)}>
              Han GyeongSu's Portfolio
            </Link>
          </div>
          <ul>{this.props.routers.map((router, idx) => this.renderLink(router, idx, rootUrl))}</ul>
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

export default LayoutHeader;
