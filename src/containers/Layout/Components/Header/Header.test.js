import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { defaultTest } from '@/TestComponent';

import Header from './index';

import Routers from '@/Router';
import rootReducer from '@/Reducers';

const store = createStore(rootReducer);

defaultTest({
  name: '/Containers/Layout/Components/Header',
  component: (
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  ),
  callback: () =>
    it('Link render check', () => {
      const wrapper = shallow(<Header routers={Routers} />);
      expect(wrapper.find(Link)).to.have.lengthOf(Routers.length);
    }),
});
