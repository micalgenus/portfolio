import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/**
 * @param {string} name Test name
 * @param {object} component Test component as <component /> object
 * @param {bool} snapshot if snapshot is true then call snapshot test in run
 * @param {function} callback run function after default test
 */
export const defaultTest = ({ name, component, snapshot = false, callback }) => {
  describe(name, () => {
    it('render test', () => {
      const div = document.createElement('div');
      ReactDOM.render(component, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    if (snapshot === true) {
      it('snapshot test', () => {
        const wrapper = shallow(component);
        expect(wrapper).toMatchSnapshot();
      });
    }

    if (typeof callback === 'function') callback.bind(this)();
  });
};

/**
 * @description Snapshot test alias
 * @param {string} name Test name
 * @param {object} component Test component as <component /> object
 * @param {function} callback run function after default test
 * @returns {undefined}
 */
export const snapshotTest = ({ name, component, callback }) => {
  if (!name || !component) return null;
  defaultTest({ name, component, snapshot: true, callback });
};
