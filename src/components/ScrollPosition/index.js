import React from 'react';
import PropTypes from 'prop-types';

import './ScrollPosition.scss';

/**
 * @param {number} top absolute position with parent element
 * @param {number} scroll now windows scroll
 * @param {number} height now browser height
 */
const ScrollPosition = ({ top, scroll, height }) => {
  const H = height >= 1 ? height : 1;
  const S = scroll <= H ? (scroll > 0 ? scroll : 0) : height;

  return (
    <div className="scroll-component progress-container" id="progress-container" style={{ top }}>
      <div className="progress-bar" id="page-status" style={{ width: `${(S / H) * 100}%` }} />
    </div>
  );
};

ScrollPosition.defaultProps = {
  top: 0,
  scroll: 0,
  height: 1,
};

ScrollPosition.propTypes = {
  top: PropTypes.number.isRequired,
  scroll: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default ScrollPosition;
