import React from 'react';
import { Link } from 'react-router-dom';

import TestComponent from '@/TestComponent';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Header from './Header';
import Routers from '@/Router';

const HeaderTest = new TestComponent({ name: '/Containers/Header', component: Header });
HeaderTest.run(() => {
  it('Link render check', () => {
    const wrapper = shallow(<Header routers={Routers} />);
    expect(wrapper.find(Link)).to.have.lengthOf(Routers.length);
  });
});
