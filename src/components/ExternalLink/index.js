import React from 'react';

const ExternalLink = ({ href, children }) => {
  const linkRegex = /^https?:\/\//;

  return (
    <a href={href} target={linkRegex.test(href) ? '_target' : '_self'}>
      {children}
    </a>
  );
};

export default ExternalLink;
