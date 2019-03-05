import React, { Component } from 'react';

import { Icon } from 'semantic-ui-react';

import './Introduce.scss';

export default class Introduce extends Component {
  renderIcon = (href, icon, color = 'black') => {
    const linkRegex = /^http?(s):\/\//;

    return (
      <span>
        <a href={href} target={linkRegex.test(href) ? '_target' : '_self'}>
          <Icon name={icon} color={color} size="tiny" />
        </a>
      </span>
    );
  };

  renderLinkList = () => (
    <div className="link-list">
      {this.renderIcon('mailto:micalgenus@gmail.com', 'mail', 'black')}
      {this.renderIcon('https://github.com/micalgenus/', 'github', 'black')}
      {this.renderIcon('https://linkedin.com/in/gyeong-su-han/', 'linkedin', 'blue')}
      {this.renderIcon('https://micalgenus.github.io/', 'edit', 'grey')}
    </div>
  );
  render() {
    return (
      <div className="introduce-component">
        <div>
          <h1>한경수{this.renderLinkList()}</h1>
          <p>주로 Node.js를 사용하여 개발을 하고있는 신입 백엔드개발자 입니다. 현재 React와 CI/CD를 공부 하고 있습니다.</p>
        </div>
      </div>
    );
  }
}
