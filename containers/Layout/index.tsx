import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ToastContainer } from 'react-toastify';

import { throttle } from 'lodash';

import { StoreProps } from '@/lib/store';
import { getLoginToken } from '@/lib/utils/cookie';
import { default as LoginPopup } from '@/containers/LoginPopup';

import { Header, Footer, ScrollTo } from './components';

import './styles/layout.font.scss';
import './styles/layout.global.scss';
import './styles/layout.scss';
import 'react-toastify/dist/ReactToastify.css';

interface EventListener {
  event: string;
  method: () => void;
}

@inject('login')
@inject('scroll')
@observer
class Layout extends Component<StoreProps> {
  events: EventListener[];

  constructor(props: StoreProps) {
    super(props);
    this.events = [
      { event: 'scroll', method: throttle(this.handleScroll, 100) },
      { event: 'scroll', method: throttle(this.handleResize, 100) },
      { event: 'resize', method: throttle(this.handleResize, 100) },
    ];
  }

  // Add Window event
  componentDidMount = () => {
    // Only run code in browser
    if (typeof window !== 'undefined') {
      const token = getLoginToken();
      if (token && this.props.login) this.props.login.login(token);
    }

    for (const e of this.events) window.addEventListener(e.event, e.method);
  };

  // Remove Window event
  componentWillUnmount = () => {
    for (const e of this.events) window.removeEventListener(e.event, e.method);
  };

  // Update scroll data with mobx
  handleScroll = () => {
    const { changeScrollY } = this.props.scroll || { changeScrollY: (n: number) => n };
    changeScrollY(window.scrollY || document.documentElement.scrollTop);
  };

  // Update window height with redux
  handleResize = () => {
    const { changeWindowHeight } = this.props.scroll || { changeWindowHeight: (n: number) => n };
    const element = document.getElementById('__next') || { scrollHeight: 0 };
    changeWindowHeight(element.scrollHeight - document.documentElement.clientHeight);
  };

  render() {
    return (
      <>
        <Header />
        <main id="main">{this.props.children}</main>
        <Footer />
        <ScrollTo />

        <LoginPopup />

        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

export default Layout;
