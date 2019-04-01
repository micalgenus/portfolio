import React, { Component } from 'react';

import { LinkIconsGroup } from '@/components';
import { LinkItem } from '@/interfaces';

interface Props {
  category: string;
  description?: string;
  links?: LinkItem[];
}

export default class CategoryTemplate extends Component<Props> {
  render() {
    const { category, description, children, links } = this.props;

    return (
      <div>
        <h1>
          {category}
          <LinkIconsGroup links={links} />
        </h1>
        {description ? <p>{description}</p> : null}
        {children}
      </div>
    );
  }
}
