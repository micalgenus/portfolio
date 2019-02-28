import React from 'react';
import { Route } from 'react-router-dom';

import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Layout from './Layout';
import Routers from '@/Router';

Enzyme.configure({ adapter: new Adapter() });

describe('/Containers/Layout', () => {
  it('Route render check', () => {
    const wrapper = shallow(<Layout routers={Routers} />);
    expect(wrapper.find(Route)).to.have.lengthOf(Routers.length);
  });
});
