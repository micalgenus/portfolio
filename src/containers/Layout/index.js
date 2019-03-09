import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';

import './Layout.font.scss';
import './Layout.global.scss';

import { Header, Footer, Router as Routing, ScrollTo } from './Components';

@inject('page')
@inject('scroll')
@observer
class Layout extends Component {
  // Add Window event
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('scroll', this.handleResize);
    window.addEventListener('resize', this.handleResize);
  };

  // Remove Window event
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('scroll', this.handleResize);
    window.removeEventListener('resize', this.handleResize);
  };

  // Update scroll data with mobx
  handleScroll = () => {
    const { changeScrollY } = this.props.scroll;
    changeScrollY(window.scrollY || document.documentElement.scrollTop);
  };

  // Update window height with redux
  handleResize = () => {
    const { changeWindowHeight } = this.props.scroll;
    changeWindowHeight(document.getElementById('root').scrollHeight - document.documentElement.clientHeight);
  };

  render() {
    const { page, scroll } = this.props;

    return (
      <Router>
        <div>
          <Header
            routers={this.props.routers}
            currentPath={page.currentPath}
            changePath={page.changePath}
            startLoadPage={page.startLoadPage}
            movedScrollY={scroll.movedScrollY}
          />
          <Routing routers={this.props.routers} endLoadPage={page.endLoadPage} />
          <Footer />
          <ScrollTo scrollY={scroll.scrollY} height={scroll.height} />
        </div>
      </Router>
    );
  }
}

Layout.defaultProps = {
  routers: [],
};

Layout.propTypes = {
  routers: PropTypes.array.isRequired,
};

export default Layout;
