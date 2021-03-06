import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ToastContainer } from 'react-toastify';
import getConfig from 'next/config';
import ReactGA from 'react-ga';

import { throttle } from 'lodash';

import { StoreProps } from '@/lib/store';
import { getLoginToken, getRememberLoginToken } from '@/lib/utils/cookie';
import { rememberLogin } from '@/lib/graphql/user';
import { default as LoginPopup } from '@/containers/LoginPopup';

import { Header, Footer, ScrollTo } from './components';

import './styles/layout.font.css';
import './styles/layout.global.css';
import './styles/layout.css';
import './styles/toast/main.css';

const { publicRuntimeConfig } = getConfig();

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

  doLogin = async () => {
    if (!this.props.login)
      // TODO: Error exception
      return;

    const remember = getRememberLoginToken();
    const loginToken = remember && (await rememberLogin(remember));

    const token = loginToken || getLoginToken();
    if (token) return this.props.login.login(token);
  };

  googleAnalytics = () => {
    ReactGA.initialize(publicRuntimeConfig.GOOGLE_ANALYTICS_KEY);
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  // Add Window event
  componentDidMount = async () => {
    // Only run code in browser
    if (typeof window !== 'undefined') {
      this.doLogin();
      this.googleAnalytics();
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
