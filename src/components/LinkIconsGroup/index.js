import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExternalLinkIcon from '@/Components/ExternalLinkIcon';

export default class LinkIconsGroup extends Component {
  render() {
    const { links } = this.props;
    return links.map((v, i) => <ExternalLinkIcon key={i} icon={v.icon} color={v.color} href={v.href} />);
  }
}

LinkIconsGroup.defaultProps = {
  links: [],
};

LinkIconsGroup.propTypes = {
  links: PropTypes.array.isRequired,
};
