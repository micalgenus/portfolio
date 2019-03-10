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
  constructor(props) {
    super(props);
    this.events = [
      { event: 'scroll', method: this.handleScroll },
      { event: 'scroll', method: this.handleResize },
      { event: 'resize', method: this.handleResize },
    ];
  }

  // Add Window event
  componentDidMount = () => {
    for (const e of this.events) {
      console.log(e);
      window.addEventListener(e.event, e.method);
    }
  };

  // Remove Window event
  componentWillUnmount = () => {
    for (const e of this.events) window.removeEventListener(e.event, e.method);
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
