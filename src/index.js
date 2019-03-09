import 'react-app-polyfill/ie9';
import './polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Stores from '@/Stores';

import * as serviceWorker from './serviceWorker';

// Load module CSS
import 'semantic-ui-css/semantic.min.css';

// Load App
import App from '@/App';

// Mobx Stores
const storeProvider = (
  <Stores>
    <App />
  </Stores>
);
const rootElement = document.getElementById('root');

// Create Dom
// hydrate for react-snap
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(storeProvider, rootElement);
} else {
  ReactDOM.render(storeProvider, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
