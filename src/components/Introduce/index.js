import React, { Component } from 'react';

import { homepage } from 'package.json';

import './Introduce.scss';

export default class Introduce extends Component {
  render() {
    return (
      <div className="introduce-component">
        <img src={`${homepage}/img/avatar.jpg`} alt="SoftWare Maestro completion ceremony." />
        <div>Intro</div>
      </div>
    );
  }
}
