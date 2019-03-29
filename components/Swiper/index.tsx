import React, { Component, ReactElement } from 'react';

import './Swiper.scss';

interface State {
  components: ReactElement[];
  position: number;
}

export default class Swiper extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = { components: this.makeChildrenList(props), position: 0 };
  }

  componentWillReceiveProps = (nextProps: any) => {
    this.setState({ components: this.makeChildrenList(nextProps), position: 0 });
  };

  makeChildrenList = ({ children }: any): ReactElement[] => {
    if (children) {
      if (children.length) return children;
      return [children];
    }
    return [];
  };

  next = () => {
    let position = this.state.position + 1;
    if (position >= this.state.components.length) position = this.state.components.length - 1;
    this.setState({ position });
  };

  pre = () => {
    let position = this.state.position - 1;
    if (position < 0) position = 0;
    this.setState({ position });
  };

  render() {
    const { components } = this.state;

    return (
      <div className="swiper-container">
        <div className="swiper-content" style={{ width: `${100 * components.length}%`, left: `${-100 * this.state.position}%` }}>
          {components.map((component, i) => (
            <div key={i} className={i === this.state.position ? 'show-component' : 'hide-component'} style={{ width: `${100 / components.length}%` }}>
              {component}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
