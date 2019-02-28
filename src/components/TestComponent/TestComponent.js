import React from 'react';
import PropTypes from 'prop-types';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export default class TestComponent {
  constructor(props) {
    this.props = {
      name: props.name,
      component: props.namcomponente,
      snapshot: props.snapshot === true ? true : false,
      args: props.args || {},
    };
  }

  run = callback => {
    const component = this.props.component;
    const args = this.props.args;

    describe(this.props.name, () => {
      if (this.props.snapshot === true) {
        it('snapshot test', () => {
          const wrapper = shallow(<component {...args} />);
          expect(wrapper).toMatchSnapshot();
        });
      }

      callback.bind(this)();
    });
  };
}

TestComponent.defaultProps = { snapshot: false, args: {} };

TestComponent.propTypes = {
  name: PropTypes.string,
  component: PropTypes.object,
  snapshot: PropTypes.bool,
  args: PropTypes.object,
};

export { shallow, mount };