import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import ExternalLink from '@/Components/ExternalLink';

export default class ExternalLinkIcon extends Component {
  render() {
    const { href, icon, color } = this.props;
    return (
      <ExternalLink href={href}>
        <Icon name={icon} color={color} size="small" />
      </ExternalLink>
    );
  }
}

ExternalLinkIcon.defaultProps = {
  icon: 'bug',
  color: 'black',
};
