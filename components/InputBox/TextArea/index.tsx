import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import { Popup } from 'semantic-ui-react';

import './TextArea.scss';

interface Props {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
}

interface State {
  height: number;
}

export default class TextArea extends Component<Props, State> {
  ref?: HTMLTextAreaElement | null;

  constructor(props: Props) {
    super(props);
    this.state = { height: 0 };
  }

  shouldComponentUpdate = (nextProps: Props, nextState: State) => {
    if (
      nextProps.label !== this.props.label ||
      nextProps.error !== this.props.label ||
      nextProps.errorMessage !== this.props.errorMessage ||
      nextProps.value !== this.props.value
    )
      return true;

    if (nextState.height !== this.state.height) return true;
    return false;
  };

  componentDidMount = () => {
    if (this.ref) this.setState({ height: this.ref.scrollHeight });
  };

  componentDidUpdate = () => {
    const target = this.ref;

    if (target && target.scrollHeight !== this.state.height) {
      setTimeout(() => this.setState({ height: target.scrollHeight }), 0);
    }
  };

  onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    const target = this.ref;

    if (target) {
      this.setState({ height: target.scrollHeight });
    }

    if (onChange) onChange(e);
  };

  renderTextArea = () => {
    const { error, value, onKeyPress } = this.props;
    return (
      <textarea
        ref={ref => (this.ref = ref)}
        placeholder=" "
        defaultValue={value}
        className={error ? 'error' : ''}
        onChange={this.onChange}
        onKeyPress={onKeyPress}
        style={{ height: this.state.height }}
      />
    );
  };

  render() {
    const { label, error, errorMessage } = this.props;

    return (
      <label className="text-area-component">
        <Popup className={`text-area-error-box ${!error ? 'disabled' : ''}`} trigger={this.renderTextArea()} position="bottom left" on="hover">
          <Popup.Content>
            <pre>{errorMessage && errorMessage.replace('\\n', '\n')}</pre>
          </Popup.Content>
        </Popup>
        <span>{label}</span>
      </label>
    );
  }
}
