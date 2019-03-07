import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import ExternalLink from '@/Components/ExternalLink';

export default class Contributes extends Component {
  render() {
    return (
      <div>
        <h2>Contributes</h2>
        <div>
          <h3>
            XpressEngine
            <ExternalLink href="https://github.com/xpressengine/xe-core/commits?author=micalgenus">
              <Icon name="linkify" color="black" size="small" />
            </ExternalLink>
          </h3>
        </div>
      </div>
    );
  }
}
