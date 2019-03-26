import React from 'react';
import { Provider } from 'mobx-react';

import scroll from './scroll';

export default ({ children }) => <Provider scroll={scroll}>{children}</Provider>;
