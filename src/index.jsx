import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';

import config from 'config';

import './main.css';
// import App from './App';
import App from 'modules/App';
import store from './store';

firebase.initializeApp(config.firebase);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
