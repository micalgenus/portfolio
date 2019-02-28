import React from 'react';
import { Route } from 'react-router-dom';

import TestComponent from '@/TestComponent';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Layout from './Layout';
import Routers from '@/Router';

const LayoutTest = new TestComponent({ name: '/Containers/Layout', component: Layout });
LayoutTest.run(() => {
  it('Route render check', () => {
    const wrapper = shallow(<Layout routers={Routers} />);
    expect(wrapper.find(Route)).to.have.lengthOf(Routers.length);
  });
});
