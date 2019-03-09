import React from 'react';
import PropTypes from 'prop-types';

import './ScrollPosition.scss';

/**
 * @param {number} top absolute position with parent element
 * @param {number} scroll now windows scroll
 * @param {number} height now browser height
 */
class ScrollPosition extends React.Component {
  render() {
    const { top, scroll, height } = this.props;
    const H = height >= 1 ? height : 1;
    const S = scroll <= H ? (scroll > 0 ? scroll : 0) : height;

    return (
      <div className="scroll-component progress-container" id="progress-container" style={{ top }}>
        <div className="progress-bar" id="page-status" style={{ width: `${(S / H) * 100}%` }} />
      </div>
    );
  }
}

ScrollPosition.defaultProps = {
  top: 0,
};

ScrollPosition.propTypes = {
  top: PropTypes.number.isRequired,
};

export default ScrollPosition;
