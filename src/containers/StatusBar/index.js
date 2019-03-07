import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ScrollPosition from '@/Components/ScrollPosition';
import LoadingStatus from '@/Components/LoadingStatus';

import { mapStateToProps, defaultProps, propTypes } from '@/Reducers';

import { hideLoading } from '@/Reducers/page';

import './StatusBar.scss';

/**
 * @description Loading and Page scroll status bar
 */
class StatusBarContainer extends Component {
  render() {
    return (
      <div className="scroll-potition-container" style={{ top: this.props.top }}>
        <ScrollPosition top={0} scroll={this.props.scrollY} height={this.props.height} />
        <LoadingStatus {...this.props} isLoading={this.props.loading} />
      </div>
    );
  }
}

StatusBarContainer.defaultProps = {
  ...defaultProps,
  top: 0,
};

StatusBarContainer.propTypes = {
  ...propTypes,
  top: PropTypes.number.isRequired,
};

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = { hideLoading };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBarContainer);
