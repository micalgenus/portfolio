import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeScrollY } from '@/Reducers/scroll';

import './Layout.font.scss';
import './Layout.global.scss';

import { Header, Router as Routing } from './Components';


class Layout extends Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    const { changeScrollY, scrollY } = this.props;
    const currentScrollY = window.scrollY;
    changeScrollY(currentScrollY);

    if (scrollY < currentScrollY) console.log('down');
    else if (scrollY > currentScrollY) console.log('up');
  };

  render() {
    return (
      <div>
        <Header
          routers={this.props.routers}
        />
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
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  changeScrollY: scrollY => dispatch(changeScrollY(scrollY)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
