import React from 'react';

import Stores from '@/Stores';

import { snapshotTest } from '@/TestComponent';

import App from './App';

snapshotTest({
  name: '/App',
  component: (
    <Stores>
      <App />
    </Stores>
  ),
});
