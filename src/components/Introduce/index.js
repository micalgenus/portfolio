import React, { Component } from 'react';

import { Icon } from 'semantic-ui-react';
import ExternalLink from '@/Components/ExternalLink';

import './Introduce.scss';

export default class Introduce extends Component {
  renderIcon = (href, icon, color = 'black') => (
    <span>
      <ExternalLink href={href}>
        <Icon name={icon} color={color} size="tiny" />
      </ExternalLink>
    </span>
  );

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
          <p>주로 Node.js를 사용하여 개발을 하고있는 신입 백엔드개발자 입니다. 현재 DevOps에 관심이 많습니다.</p>
        </div>
      </div>
    );
  }
}
