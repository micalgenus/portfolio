import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '@/Containers/Layout';

import Routers from '@/Router';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout {...this.props} routers={Routers} />
      </Router>
    );
  }
}

export default App;
