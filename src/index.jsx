import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { DateTime, Settings } from 'luxon';

import config from 'config';

import './main.css';
// import App from './App';
import App from 'modules/App';
import store from './store';

Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;
firebase.initializeApp(config.firebase);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
