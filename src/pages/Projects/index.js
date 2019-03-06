import React, { Component } from 'react';

import { SWTalentDonationChallenge } from '@/Projects';

export default class Projects extends Component {
  componentDidMount = () => {
    if (this.props.hideLoading && typeof this.props.hideLoading === 'function') this.props.hideLoading();
  };

  render() {
    return (
      <>
        <SWTalentDonationChallenge />
      </>
    );
  }
}
