import 'react-app-polyfill/ie9';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import rootReducer from '@/Reducers';

// Load module CSS
import 'semantic-ui-css/semantic.min.css';

// Load App
import App from '@/App';

const reducers =
  process.env.NODE_ENV !== 'development' ? [rootReducer] : [rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()];

const store = createStore(...reducers);

const storeProvider = (
  <Provider store={store}>
    <App />
  </Provider>
);
const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(storeProvider, rootElement);
} else {
  ReactDOM.render(storeProvider, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
