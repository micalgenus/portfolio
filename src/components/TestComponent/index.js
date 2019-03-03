import React from 'react';
import PropTypes from 'prop-types';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/**
 * @param {string} name Test name
 * @param {object} component Test component
 * @param {bool} snapshot if snapshot is true then call snapshot test in run
 * @param {object} args if snapshot is true then this value use at create component
 */
export default class TestComponent {
  constructor(props) {
    this.props = {
      name: props.name,
      component: props.namcomponente,
      snapshot: props.snapshot === true ? true : false,
      args: props.args || {}, //
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

      if (typeof callback === 'function') callback.bind(this)();
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

// Snapshot test alias
export const snapshotTest = (name, component, argv) => {
  if (!name || !component) return null;
  const snapshotTestComponent = new TestComponent({ name: name, component: component, snapshot: true, args: argv });
  snapshotTestComponent.run(null);
};
