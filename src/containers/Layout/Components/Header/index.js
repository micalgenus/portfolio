import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class LayoutHeader extends Component {
  render() {
    return (
      <header>
        <div className="blur" />
        <div>
          <Link to="/">GyeongSu Han's Portfolio</Link>
        </div>

        <nav>
          {this.props.routers.map((router, idx) =>
            router.path && router.path !== '/' ? (
              <Link key={idx} to={router.path}>
                {router.title}
              </Link>
            ) : null
          )}
        </nav>
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
