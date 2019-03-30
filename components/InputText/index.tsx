import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { Popup } from 'semantic-ui-react';

import './InputText.scss';

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export default class InputText extends Component<Props> {
  render() {
    const { label, type, error, errorMessage, onChange, onKeyPress } = this.props;
    return (
      <label className="input-text-component">
        <Popup
          className={`input-text-error-box ${!error ? 'disabled' : ''}`}
          trigger={<input placeholder=" " type={type || 'text'} className={error ? 'error' : ''} onChange={onChange} onKeyPress={onKeyPress} />}
          position="bottom left"
          on="hover"
        >
          <Popup.Content>
            <pre>{errorMessage && errorMessage.replace('\\n', '\n')}</pre>
          </Popup.Content>
        </Popup>
        <span>{label}</span>
      </label>
    );
  }
}
