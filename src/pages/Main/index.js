import React, { Component } from 'react';

import Projects from '@/Pages/Projects';

export default class Main extends Component {
  componentDidMount = () => {
    if (this.props.hideLoading && typeof this.props.hideLoading === 'function') this.props.hideLoading();
  };

  render() {
    return (
      <>
        <Projects />
      </>
    );
  }
}
