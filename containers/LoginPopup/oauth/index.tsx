import React, { Component } from 'react';
import { Button, Icon, SemanticICONS, StrictButtonProps } from 'semantic-ui-react';
import { StandardLonghandProperties } from 'csstype';

interface Props {
  path: string;
  label: string;
  name?: string;
  icon?: SemanticICONS;
  color?: StandardLonghandProperties<React.Key>['color'];
  backgroundColor?: StrictButtonProps['color'];
  callback: () => void;
}

export default class OAuthPopup extends Component<Props> {
  showPopup = () => {
    const { path, name, label, callback } = this.props;

    const _oauthWindow = window.open(path, name || `Connecting with ${label}`, 'status=0,width=600,height=800');
    if (!_oauthWindow) return;

    const _oauthInterval = window.setInterval(() => {
      if (_oauthWindow.closed) {
        window.clearInterval(_oauthInterval);
        callback();
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
