import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './Components';

import './Layout.scss';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <div>
            {this.props.routers.map((route, idx) =>
              route.Component ? <Route key={idx} exact={route.exact} path={route.path} component={route.Component} /> : null
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

Layout.defaultProps = {
  routers: [],
};

Layout.propTypes = {
  routers: PropTypes.array,
};
