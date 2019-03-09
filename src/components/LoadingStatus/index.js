import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Progress } from 'semantic-ui-react';

import './LoadingStatus.scss';

/**
 * @param {number} timeout limit timeout millisecond
 * @param {bool} isLoading if value is true then show component, but false then hide component
 */
export default class LoadingStatus extends Component {
  state = { error: false, percent: 0, timeout: 5000, isVisible: false };

  componentWillReceiveProps = nextProps => {
    if (nextProps.isLoading !== this.props.isLoading) {
      if (nextProps.isLoading === true) this.startLoading(5000);
      if (nextProps.isLoading === false) this.endLoading(false);
    }
  };

  // Initialize value for start
  startLoading = timeout => {
    this.setState({ percent: 0, timeout: timeout, isVisible: true });
  };

  endLoading = error => {
    // 100ms for dispaly at not loading
    setTimeout(() => this.setState({ percent: 100, error: error, isVisible: false }), 100);

    // 500ms for clear value
    setTimeout(() => {
      this.setState({ percent: 0 });
    }, 500);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.isVisible !== nextState.isVisible) return true;
    if (this.state.percent !== nextState.percent) return true;
    if (this.state.error !== nextState.error) return true;
    return false;
  };

  componentDidUpdate = prevState => {
    // run only loading
    if (this.props.isLoading || this.state.percen === 100) {
      if (this.state.percent <= 80) setTimeout(() => this.setState({ percent: this.state.percent + 1 }), this.state.timeout / 80);
      // if percent is 100 without hideLoading of redux
      else this.endLoading(true);
    }
  };

  render() {
    return (
      <div className={`loading-status-component ${this.state.isVisible ? 'show' : 'hide'}`}>
        <Progress style={{ width: '100%', background: 'none' }} percent={this.state.percent} error={this.state.error} indicating size="tiny" />
      </div>
    );
  }
}

LoadingStatus.defaultProps = {
  isLoading: false,
};

LoadingStatus.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
