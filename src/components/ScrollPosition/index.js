import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ScrollPosition.scss';

export default class ScrollPosition extends Component {
  render() {
    const height = this.props.height >= 1 ? this.props.height : 1;
    const scroll = this.props.scroll <= height ? (this.props.scroll > 0 ? this.props.scroll : 0) : this.props.height;

    // document.getElementById('root').scrollHeight - document.documentElement.clientHeight
    return (
      <div className="scroll-component progress-container" id="progress-container" style={{ top: this.props.top }}>
        <div className="progress-bar" id="page-status" style={{ width: `${(scroll / height) * 100}%` }} />
      </div>
    );
  }
}

ScrollPosition.defaultProps = {
  top: 0,
  scroll: 0,
  height: 1,
};

ScrollPosition.propTypes = {
  top: PropTypes.number,
  scroll: PropTypes.number,
  height: PropTypes.number,
};
