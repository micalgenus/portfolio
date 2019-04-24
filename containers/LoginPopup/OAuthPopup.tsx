import React, { Component } from 'react';
import { Button, Icon, SemanticICONS, StrictButtonProps } from 'semantic-ui-react';
import { StandardLonghandProperties } from 'csstype';
import { inject, observer } from 'mobx-react';

import { StoreProps } from '@/lib/store';
import { getLoginToken } from '@/lib/utils/cookie';

interface Props extends StoreProps {
  path: string;
  label: string;
  name?: string;
  icon?: SemanticICONS;
  color?: StandardLonghandProperties<React.Key>['color'];
  backgroundColor?: StrictButtonProps['color'];
  callback: () => void;
}

@inject('login')
@observer
export default class OAuthPopup extends Component<Props> {
  doLogin = async () => {
    if (!this.props.login)
      // TODO: Error exception
      return;

    const token = getLoginToken();
    if (token) return this.props.login.login(token);
  };

  showPopup = () => {
    const { path, name, label, callback } = this.props;

    const _oauthWindow = window.open(path, name || `Connecting with ${label}`, 'status=0,width=600,height=800');
    if (!_oauthWindow) return;

    const _oauthInterval = window.setInterval(() => {
      if (_oauthWindow.closed) {
        window.clearInterval(_oauthInterval);

        this.doLogin().then(() => callback());
      }
    }, 500);
  };

  render() {
    const { label, icon, color, backgroundColor } = this.props;
    return (
      <Button onClick={this.showPopup} className="btn btn-social" icon labelPosition="left" fluid color={backgroundColor}>
        <Icon size="large" inverted name={icon} />
        <span style={{ color: color || 'black', fontWeight: 'normal' }}>{label}</span>
      </Button>
    );
  }
}
