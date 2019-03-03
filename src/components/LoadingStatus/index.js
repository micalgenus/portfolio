import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Progress } from 'semantic-ui-react';

import './LoadingStatus.scss';

export default class LoadingStatus extends Component {
  state = { error: false, percent: 0, timeout: 0, isVisible: false };

  componentWillReceiveProps = nextProps => {
    if (nextProps.isLoading !== this.props.isLoading) {
      if (nextProps.isLoading === true) this.startLoading(nextProps.timeout);
      if (nextProps.isLoading === false) this.endLoading(false);
    }
  };

  startLoading = timeout => {
    this.setState({ percent: 0, timeout: timeout, isVisible: true });
  };

  endLoading = error => {
    setTimeout(() => this.setState({ percent: 100, error: error, isVisible: false }), 100);

    setTimeout(() => {
      this.props.hideLoading();
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
    if (this.props.isLoading || this.state.percen === 100) {
      if (this.state.percent <= 50) setTimeout(() => this.setState({ percent: this.state.percent + 1 }), this.state.timeout / 50);
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
  timeout: 5000,
  isLoading: false,
};

LoadingStatus.propTypes = {
  timeout: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
