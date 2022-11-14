console.log(new XMLHttpRequest());
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { DateTime, Settings } from 'luxon';

import config from 'config';

import './main.css';
// import App from './App';
import App from 'modules/App';
import store from './store';

Settings.defaultLocale = 'uk-UA'; //DateTime.local().resolvedLocaleOpts().locale;
firebase.initializeApp(config.firebase);

firebase.auth();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
