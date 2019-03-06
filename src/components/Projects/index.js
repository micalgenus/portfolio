import React, { Component } from 'react';

import SWTalentDonationChallenge from './2017-SW-talent-donation-challenge';
import MubaBot from './2018-Muba-bot';

export default class Projects extends Component {
  render() {
    return (
      <div>
        <h2>Projects</h2>
        <MubaBot />
        <SWTalentDonationChallenge />
      </div>
    );
  }
}

export { SWTalentDonationChallenge, MubaBot };
