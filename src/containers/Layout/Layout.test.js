import React from 'react';

import Stores from '@/Stores';

import { snapshotTest } from '@/TestComponent';

import Layout from './index';

import Routers from '@/Router';

snapshotTest({
  name: '/Containers/Layout',
  component: (
    <Stores>
      <Layout routers={Routers} />
    </Stores>
  ),
});
