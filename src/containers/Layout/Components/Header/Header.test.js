import React from 'react';

import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Link } from 'react-router-dom';

import Header from './Header';
import Routers from '@/Router';

Enzyme.configure({ adapter: new Adapter() });

describe('/Containers/Layout/Components/Header', () => {
  it('Link render check', () => {
    const wrapper = shallow(<Header routers={Routers} />);
    expect(wrapper.find(Link)).to.have.lengthOf(Routers.length);
  });
});
