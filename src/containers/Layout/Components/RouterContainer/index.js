import React, { Suspense, Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Router.scss';

class Router extends Component {
  render() {
    const { endLoadPage } = this.props;

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
                  component={props => <route.Component {...props} link={route.path} endLoadPage={endLoadPage} />}
                />
              ) : null
            )}
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default Router;
