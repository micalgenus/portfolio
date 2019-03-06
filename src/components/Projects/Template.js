import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Projects.scss';

export default class ProjectTemplate extends Component {
  render() {
    return (
      <div className="project-component">
        <h3>{this.props.title}</h3>
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
};

ProjectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.object.isRequired,
};
