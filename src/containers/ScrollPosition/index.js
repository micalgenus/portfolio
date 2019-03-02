import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScrollPosition from '@/Components/ScrollPosition';

import './ScrollPosition.scss';

class ScrollPositionContainer extends Component {
  render() {
    return (
      <div className="scroll-potition-container" style={{ top: this.props.top }}>
        <ScrollPosition top={0} scroll={this.props.scrollY} height={this.props.height} />
      </div>
    );
  }
}

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
)(ScrollPositionContainer);
