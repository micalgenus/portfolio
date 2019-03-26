import React from 'react';

export default class ExternalLink extends React.Component {
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
