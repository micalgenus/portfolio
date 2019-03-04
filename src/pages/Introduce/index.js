import React, { Component } from 'react';

export default class Introduce extends Component {
  componentDidMount = () => {
    if (this.props.hideLoading && typeof this.props.hideLoading === 'function') this.props.hideLoading();
  };

  render() {
    return (
      <div>
        <p>Introduce</p>
      </div>
    );
  }
}
