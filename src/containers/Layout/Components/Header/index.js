import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusBar from '@/Containers/StatusBar';

import './Header.scss';

const windowScrollToPosition = position => window.scroll(0, position);

const windowScrollToPositionDelay = async (position, delay) =>
  await new Promise(resolve =>
    setTimeout(() => {
      windowScrollToPosition(position);
      return resolve(true);
    }, delay)
  );

const windowScrollAnimation = (time, interval, end) => {
  (async () => {
    while (time > 0) {
      const now = window.scrollY;
      const rest = time / interval;

      const step = (end - now) / rest;
      await windowScrollToPositionDelay(now + step, interval);

      time -= interval;
    }
  })();
};

export default class LayoutHeader extends Component {
  onChangeRoute = link => {
    this.props.changePath(link);

    const animationMilliSecond = 100; // 1000ms = 1s
    const animationIntervalTime = 5; // milliseconds

    windowScrollAnimation(animationMilliSecond, animationIntervalTime, 0);
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
