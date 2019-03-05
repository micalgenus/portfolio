import React, { Component } from 'react';

import ExternalLink from '@/Components/ExternalLink';

import './Footer.scss';

export default class LayoutFooter extends Component {
  getCopyRight = () => (
    <div>
      The source code is on <ExternalLink href="https://github.com/micalgenus/portfolio">Github</ExternalLink>. &copy;All Rights Reserved, GyeongSu Han.
    </div>
  );

  getBuildAndTestInfo = () => (
    <div>
      Powered by React. Tests use <ExternalLink href="https://travis-ci.org/micalgenus/portfolio">Travis-ci</ExternalLink> and{' '}
      <ExternalLink href="https://codeclimate.com/github/micalgenus/portfolio">codeclimate</ExternalLink>.
    </div>
  );

  getServerInfo = () => (
    <div>
      Hosted by Google Cloud Platform using Nginx and <ExternalLink href="https://hub.docker.com/r/micalgenus/portfolio">Docker</ExternalLink> swarm.
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
