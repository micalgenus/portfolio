import React, { Component } from 'react';

import './Footer.scss';

export default class LayoutFooter extends Component {
  getCopyRight = () => (
    <div>
      The source code is on{' '}
      <a rel="noopener noreferrer" href="https://github.com/micalgenus/portfolio" target="_blank">
        Github
      </a>
      . &copy;All Rights Reserved, GyeongSu Han.
    </div>
  );

  getBuildAndTestInfo = () => (
    <div>
      Powered by React. Tests use{' '}
      <a rel="noopener noreferrer" href="https://travis-ci.org/micalgenus/portfolio" target="_blank">
        Travis-ci
      </a>{' '}
      and{' '}
      <a rel="noopener noreferrer" href="https://codeclimate.com/github/micalgenus/portfolio" target="_blank">
        codeclimate
      </a>
      .
    </div>
  );

  getServerInfo = () => (
    <div>
      Hosted by Google Cloud Platform using Nginx and{' '}
      <a rel="noopener noreferrer" href="https://hub.docker.com/r/micalgenus/portfolio" target="_blank">
        Docker
      </a>{' '}
      swarm.
    </div>
  );

  render() {
    return (
      <footer>
        {this.getCopyRight()}
        {this.getBuildAndTestInfo()}
        {this.getServerInfo()}
      </footer>
    );
  }
}
