import React from 'react';
import { Provider } from 'mobx-react';

import page from './page';
import scroll from './scroll';

export default ({ children }) => (
  <Provider page={page} scroll={scroll}>
    {children}
  </Provider>
);
