import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { mapStateToProps } from '@/Reducers';

import { changeScrollY, changeWindowHeight } from '@/Reducers/scroll';
import { changePath, showLoading, hideLoading } from '@/Reducers/page';

import './Layout.font.scss';
import './Layout.global.scss';

import { Header, Footer, Router as Routing, ScrollTo } from './Components';

const HEADER_SPEED = 3;
const HEADER_HEIGHT = 60;

class Layout extends Component {
  state = { header: 0 };

  componentWillReceiveProps = nextProps => {
    // Get header fixed position from redux scroll
    const header =
      nextProps.scrollY <= HEADER_HEIGHT && nextProps.scrollY < this.state.header
        ? nextProps.scrollY
        : this.state.header + (nextProps.scrollY - this.props.scrollY) / HEADER_SPEED;
    this.setState({ header: header <= HEADER_HEIGHT ? (header >= 0 ? header : 0) : HEADER_HEIGHT });

    if (this.props.loading !== nextProps.loading && !nextProps.loading) this.handleResize();
  };

  // Update by redux and state
  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      nextProps.height !== this.props.height ||
      nextProps.scrollY !== this.props.scrollY ||
      nextProps.path !== this.props.path ||
      nextProps.loading !== this.props.loading ||
      nextState.header !== this.state.header
    )
      return true;

    return false;
  };

  componentDidMount = () => {
    // Add Window event
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    // Apply browser path with redux
    this.props.changePath(window.location.pathname);
  };

  componentWillUnmount = () => {
    // Remove Window event
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  };

  // Update scroll data with redux
  handleScroll = () => {
    const { changeScrollY } = this.props;
    // document.documentElement.scrollTop for IE
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    if (this.props.scrollY !== currentScrollY) changeScrollY(currentScrollY >= 0 ? currentScrollY : 0);
  };

  // Update window height with redux
  handleResize = () => {
    const { changeWindowHeight } = this.props;
    const height = document.getElementById('root').scrollHeight - document.documentElement.clientHeight;
    if (this.props.height !== height) changeWindowHeight(height >= 0 ? height : 0);
  };

  render() {
    return (
      <Router>
        <div>
          <Header {...this.props} />
          <Routing {...this.props} />
          <Footer />
          <ScrollTo height={this.props.height} scrollY={this.props.scrollY} />
        </div>
      </Router>
    );
  }
}

Layout.defaultProps = {
  routers: [],
  scrollY: 0,
  height: 0,
  path: '/',
  loading: false,
};

Layout.propTypes = {
  routers: PropTypes.array.isRequired,
  scrollY: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = { changeScrollY, changePath, changeWindowHeight, showLoading, hideLoading };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
