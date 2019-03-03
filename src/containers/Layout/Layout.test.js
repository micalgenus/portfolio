import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { snapshotTest } from '@/TestComponent';

import Layout from './index';

import Routers from '@/Router';
import rootReducer from '@/Reducers';

const store = createStore(rootReducer);

snapshotTest({
  name: '/Containers/Layout',
  component: (
    <Provider store={store}>
      <Layout routers={Routers} />
    </Provider>
  ),
});
