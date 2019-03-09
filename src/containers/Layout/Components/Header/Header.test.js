import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import Stores from '@/Stores';

import { defaultTest } from '@/TestComponent';

import Header from './index';

import Routers from '@/Router';

defaultTest({
  name: '/Containers/Layout/Components/Header',
  component: (
    <Stores>
      <Router>
        <Header />
      </Router>
    </Stores>
  ),
  callback: () =>
    it('Link render check', () => {
      const wrapper = shallow(<Header routers={Routers} />);
      expect(wrapper.find(Link)).to.have.lengthOf(Routers.length);
    }),
});
