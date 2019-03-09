import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import ExternalLink from '@/Components/ExternalLink';

export default class Educations extends Component {
  render() {
    return (
      <div>
        <h2>Educations</h2>
        <div>
          <h3>
            Software Maestro 9th.
            <ExternalLink href="http://www.swmaestro.kr">
              <Icon name="home" color="black" size="small" />
            </ExternalLink>
          </h3>
          <p>2018. 06. ~ 2018. 12.</p>
        </div>
      </div>
    );
  }
}
