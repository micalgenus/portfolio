import React, { Component } from 'react';

import { ExternalLink } from '@/components';

import './styles/footer.scss';

export default class LayoutFooter extends Component {
  getCopyRight = () => (
    <p>
      The source code is on <ExternalLink href="https://github.com/micalgenus/portfolio">Github</ExternalLink>. &copy;All Rights Reserved,{' '}
      <ExternalLink href="https://github.com/micalgenus">micalgenus</ExternalLink>.
    </p>
  );

  getBuildAndTestInfo = () => (
    <p>
      Powered by <ExternalLink href="https://nextjs.org/">Next</ExternalLink>. Tests use{' '}
      <ExternalLink href="https://travis-ci.org/micalgenus/portfolio">Travis-ci</ExternalLink> and{' '}
      <ExternalLink href="https://codeclimate.com/github/micalgenus/portfolio">codeclimate</ExternalLink>.
    </p>
  );

  getServerInfo = () => (
    <p>
      Hosted by Google Cloud Platform using Nginx and <ExternalLink href="https://hub.docker.com/r/micalgenus/portfolio">Docker</ExternalLink> swarm.
    </p>
  );

  render() {
    return (
      <footer>
        {this.getCopyRight()}
        {this.getBuildAndTestInfo()}
        {this.getServerInfo()}{' '}
      </footer>
    );
  }
}
