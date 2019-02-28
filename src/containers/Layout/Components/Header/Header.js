import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class LayoutHeader extends Component {
  render() {
    return (
      <header>
        {this.props.routers.map((router, idx) =>
          router.path ? (
            <Link key={idx} to={router.path}>
              {router.title}
            </Link>
          ) : null
        )}
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
