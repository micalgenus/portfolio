import React, { Component } from 'react';

import Layout from '@/Containers/Layout';
import Routers from '@/Router';

class App extends Component {
  render() {
    return <Layout {...this.props} routers={Routers} />;
  }
}

export default App;
