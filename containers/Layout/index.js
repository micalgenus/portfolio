import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './styles/layout.font.scss';
import './styles/layout.global.scss';
import './styles/layout.scss';

import { Header, Footer, ScrollTo } from './components';

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
    for (const e of this.events) window.addEventListener(e.event, e.method);
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
    changeWindowHeight(document.getElementById('__next').scrollHeight - document.documentElement.clientHeight);
  };

  render() {
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
        <ScrollTo />
      </>
    );
  }
}

export default Layout;
