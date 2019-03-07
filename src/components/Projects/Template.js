import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import ExternalLink from '@/Components/ExternalLink';

import './Projects.scss';

export default class ProjectTemplate extends Component {
  render() {
    return (
      <div className="project-component">
        <h3>
          {this.props.title}
          {this.props.links.map((v, i) => (
            <ExternalLink href={v.href} key={i}>
              <Icon name={v.icon} color={v.color} size="small" />
            </ExternalLink>
          ))}
        </h3>
        <p>{this.props.description}</p>
        {this.props.children}
      </div>
    );
  }
}

ProjectTemplate.defaultProps = {
  title: '',
  description: '',
  children: <div />,
  links: [],
};

ProjectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.object.isRequired,
  links: PropTypes.array,
};
