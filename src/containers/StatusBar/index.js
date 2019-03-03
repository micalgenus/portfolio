import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ScrollPosition from '@/Components/ScrollPosition';

import './StatusBar.scss';

/**
 * @description Loading and Page scroll status bar
 */
class StatusBarContainer extends Component {
  render() {
    return (
      <div className="scroll-potition-container" style={{ top: this.props.top }}>
        {this.props.isLoading ? null : <ScrollPosition top={0} scroll={this.props.scrollY} height={this.props.height} />}
      </div>
    );
  }
}

StatusBarContainer.defaultProps = {
  top: 0,
  isLoading: false,
};

StatusBarContainer.propTypes = {
  top: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  scrollY: state.scroll.scrollY,
  height: state.scroll.height,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBarContainer);
