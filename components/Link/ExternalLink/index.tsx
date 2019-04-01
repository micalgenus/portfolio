import React, { Component } from 'react';

interface Props {
  href: string;
}

export default class ExternalLink extends Component<Props> {
  render() {
    const linkRegex = /^https?:\/\//;
    const { href, children } = this.props;

    return (
      <a href={href} target={linkRegex.test(href) ? '_target' : '_self'}>
        {children}
      </a>
    );
  }
}
