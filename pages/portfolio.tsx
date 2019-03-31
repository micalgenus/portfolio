import React, { Component } from 'react';

import { PageProps } from '@/interfaces';

interface Props extends PageProps {}

export default class PortfolioPage extends Component<Props> {
  render() {
    return <div>{this.props.router.query.id}</div>;
  }
}
