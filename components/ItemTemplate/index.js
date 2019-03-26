import React, { Component } from 'react';

import { LinkIconsGroup } from '@/components';

export default class ItemTemplate extends Component {
  render() {
    const { title, links, date, description } = this.props;

    return (
      <div>
        <h3>
          {title}
          <LinkIconsGroup links={links} />
        </h3>
        {date ? <p>{date}</p> : null}
        {description ? <p>{description}</p> : null}
      </div>
    );
  }
}
