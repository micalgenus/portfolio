import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProjectTemplate extends Component {
  render() {
    return (
      <div>
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
