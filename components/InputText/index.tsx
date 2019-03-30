import React, { Component, ChangeEvent } from 'react';

import './InputText.scss';

interface Props {
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
}

export default class InputText extends Component<Props> {
  render() {
    const { label, type, error, onChange } = this.props;
    return (
      <label className="input-text-component">
        <input placeholder=" " type={type || 'text'} className={error ? 'error' : ''} onChange={onChange} />
        <span>{label}</span>
      </label>
    );
  }
}
