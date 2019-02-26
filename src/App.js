import React, { Component } from 'react';
import Layout from './Containers';

import Router from './Router';

class App extends Component {
  render() {
    return <Layout {...this.props} routers={Router} />;
  }
}

export default App;
