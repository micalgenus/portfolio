import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import ExternalLink from '@/Components/ExternalLink';

export default class MobilityLab extends Component {
  render() {
    return (
      <div>
        <h3>
          모빌리티랩
          <ExternalLink href="https://github.com/micalgenus/vgram-web">
            <Icon name="github" color="black" size="small" />
          </ExternalLink>
          <ExternalLink href="https://github.com/micalgenus/vgram-app">
            <Icon name="github" color="black" size="small" />
          </ExternalLink>
          <ExternalLink href="https://github.com/micalgenus/vgram-image-server">
            <Icon name="github" color="black" size="small" />
          </ExternalLink>
        </h3>
        <p>2016.12. ~ 2017.12.</p>
        <p>VR 미디어를 사용하여 인테리어 업자와 건물주를 연결시켜 주는 웹/어플리케이션 개발</p>
      </div>
    );
  }
}
