import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import ExternalLink from '@/Components/ExternalLink';

export default class ToyProjects extends Component {
  render() {
    return (
      <div>
        <h2>Toy Projects</h2>
        <div>
          <h3>
            Portfolio
            <ExternalLink href="https://portfolio.micalgenus.com/">
              <Icon name="home" color="black" size="small" />
            </ExternalLink>
            <ExternalLink href="https://github.com/micalgenus/portfolio">
              <Icon name="github" color="black" size="small" />
            </ExternalLink>
            <ExternalLink href="https://hub.docker.com/r/micalgenus/portfolio">
              <Icon name="docker" color="blue" size="small" />
            </ExternalLink>
          </h3>
          <p>GCP + Travis-ci + Docker 환경에서 React + DevOps개발 공부</p>
        </div>
      </div>
    );
  }
}
