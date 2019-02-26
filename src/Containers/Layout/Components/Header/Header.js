import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class LayoutHeader extends Component {
  render() {
    return (
      <div>
        {this.props.routers.map((router, idx) =>
          router.path ? (
            <Link key={idx} to={router.path}>
              {router.title}
            </Link>
          ) : null
        )}
      </div>
    );
  }
}

LayoutHeader.defaultProps = {
  routers: [],
};

LayoutHeader.propTypes = {
  routers: PropTypes.array,
};
