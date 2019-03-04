import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Projects.scss';

export default class ProjectTemplate extends Component {
  render() {
    return (
      <div className="project-component">
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

ProjectTemplate.defaultProps = {
  title: '',
  description: '',
  children: <div />,
};

ProjectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.object.isRequired,
};
