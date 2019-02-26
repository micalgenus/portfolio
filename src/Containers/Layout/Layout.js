import React, { Suspense, Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './Components';

import './Layout.scss';

export default class Layout extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header routers={this.props.routers} />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {this.props.routers.map((route, idx) =>
                route.Component ? <Route key={idx} exact={route.exact} path={route.path} component={route.Component} /> : null
              )}
            </Switch>
          </Suspense>
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
