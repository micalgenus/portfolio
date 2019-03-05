import React, { Suspense, Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Router.scss';

export default class Router extends Component {
  // Update only path change
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.path !== nextProps.path) return true;

    return false;
  };

  render() {
    return (
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {this.props.routers.map((route, idx) =>
              route.Component ? (
                <Route
                  key={idx}
                  exact={route.exact}
                  path={route.path}
                  component={props => <route.Component {...props} hideLoading={this.props.hideLoading} />}
                />
              ) : null
            )}
          </Switch>
        </Suspense>
      </div>
    );
  }
}
