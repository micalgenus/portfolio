import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '@/Reducers';

import { snapshotTest } from '@/TestComponent';

import App from './App';

const store = createStore(rootReducer);

snapshotTest({
  name: '/App',
  component: (
    <Provider store={store}>
      <App />
    </Provider>
  ),
});
