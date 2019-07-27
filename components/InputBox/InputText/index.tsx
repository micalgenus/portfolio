import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { Popup } from 'semantic-ui-react';

import './InputText.css';

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  disabled?: boolean;
}

export default class InputText extends Component<Props> {
  render() {
    const { label, type, error, value, disabled, errorMessage, onChange, onKeyPress } = this.props;

    return (
      <label className="input-text-component">
        <Popup
          className={`input-text-error-box ${!error ? 'disabled' : ''}`}
          trigger={
            <input
              placeholder=" "
              disabled={disabled || false}
              defaultValue={value}
              type={type || 'text'}
              className={error ? 'error' : ''}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          }
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
