import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import { ExternalLink } from '@/components';
import { LinkItem } from '@/interfaces';

interface Props extends LinkItem {
  href: string;
}

export default class ExternalLinkIcon extends Component<Props> {
  render() {
    const { href, icon, color } = this.props;
    return (
      <ExternalLink href={href}>
        <Icon name={icon} color={color} size="small" />
      </ExternalLink>
    );
  }
}
