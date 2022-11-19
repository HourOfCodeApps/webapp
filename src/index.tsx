import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DateTime, Settings } from 'luxon';

import config from 'config';

import './main.css';
// import App from './App';
import App from 'modules/App';
import store from './store';

Settings.defaultLocale = 'uk-UA'; //DateTime.local().resolvedLocaleOpts().locale;
firebase.initializeApp(config.firebase);

firebase.auth();

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('app'),
);
