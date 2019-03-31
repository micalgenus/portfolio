import React, { Component } from 'react';

import { ExternalLinkIcon } from '@/components';

import { LinkItem } from '@/interfaces';

import './LinkIconsGroup.scss';

interface Props {
  links?: LinkItem[];
}

export default class LinkIconsGroup extends Component<Props> {
  render() {
    const { links } = this.props;
    return (
      <span className="link-icons-component">{links && links.map((v, i) => <ExternalLinkIcon key={i} icon={v.icon} color={v.color} href={v.href} />)}</span>
    );
  }
}
