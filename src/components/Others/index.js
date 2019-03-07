import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import ExternalLink from '@/Components/ExternalLink';

export default class Contributes extends Component {
  render() {
    return (
      <div>
        <h2>Others</h2>
        <div>
          <h3>
            Github Page Blog
            <ExternalLink href="https://micalgenus.github.io/">
              <Icon name="home" color="black" size="small" />
            </ExternalLink>
          </h3>
        </div>
      </div>
    );
  }
}
