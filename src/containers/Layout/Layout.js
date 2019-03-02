import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header, Router as Routing } from './Components';

import './Layout.scss';

export default class Layout extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header routers={this.props.routers} />
          <Routing routers={this.props.routers} />
        </div>
      </Router>
    );
  }
}

Layout.defaultProps = {
  routers: [],
};

Layout.propTypes = {
  routers: PropTypes.array,
};
