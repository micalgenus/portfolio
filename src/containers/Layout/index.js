import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeScrollY, changeWindowHeight } from '@/Reducers/scroll';
import { changePath } from '@/Reducers/page';

import './Layout.font.scss';
import './Layout.global.scss';

import { Header, Router as Routing } from './Components';

const HEADER_SPEED = 3;
const HEADER_HEIGHT = 60;

class Layout extends Component {
  state = { header: 0 };

  componentWillReceiveProps = nextProps => {
    const header = this.state.header + (nextProps.scrollY - this.props.scrollY) / HEADER_SPEED;
    this.setState({ header: header <= HEADER_HEIGHT ? (header >= 0 ? header : 0) : HEADER_HEIGHT });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.height !== this.props.height) return true;
    if (nextProps.scrollY !== this.props.scrollY) return true;
    if (nextProps.path !== this.props.path) return true;

    if (nextState.header !== this.state.header) return true;

    return false;
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    this.props.changePath(window.location.pathname);
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.handleResize();
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  };

  handleScroll = () => {
    const { changeScrollY } = this.props;
    const currentScrollY = window.scrollY;
    if (this.props.scrollY !== currentScrollY) changeScrollY(currentScrollY);
  };

  handleResize = () => {
    const { changeWindowHeight } = this.props;
    const height = document.getElementById('root').scrollHeight - document.documentElement.clientHeight;
    if (this.props.height !== height) changeWindowHeight(height);
  };

  render() {
    return (
      <div>
        <Header routers={this.props.routers} changePath={this.props.changePath} scrollY={this.props.scrollY} header={this.state.header} />
        <Routing routers={this.props.routers} />
      </div>
    );
  }
}

Layout.defaultProps = {
  routers: [],
};

Layout.propTypes = {
  routers: PropTypes.array,
};

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  scrollY: state.scroll.scrollY,
  height: state.scroll.height,
  path: state.page.path,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = { changeScrollY, changePath, changeWindowHeight };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
