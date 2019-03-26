import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ExternalLinkIcon } from '@/components';

import './LinkIconsGroup.scss';

export default class LinkIconsGroup extends Component {
  render() {
    const { links } = this.props;
    return (
      <span className={'link-icons-component'}>
        {links.map((v, i) => (
          <ExternalLinkIcon key={i} icon={v.icon} color={v.color} href={v.href} />
        ))}
      </span>
    );
  }
}

LinkIconsGroup.defaultProps = {
  links: [],
};

LinkIconsGroup.propTypes = {
  links: PropTypes.array.isRequired,
};
