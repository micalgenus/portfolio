import React, { Component } from 'react';

import { LinkIconsGroup } from '@/components';

export default class CategoryTemplate extends Component {
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
