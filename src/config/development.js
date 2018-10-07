import defaultsDeep from 'lodash/defaultsDeep';
import base from './base';

const config = {
  firebase: {
    apiKey: 'AIzaSyBwBtareu_jsCdeRK4S2LP-QFxHUWKygnU',
    authDomain: 'hoc-org-dev.firebaseapp.com',
    databaseURL: 'https://hoc-org-dev.firebaseio.com',
    projectId: 'hoc-org-dev',
    storageBucket: 'hoc-org-dev.appspot.com',
    messagingSenderId: '281059038812',
  },
  map: {
    key: 'AIzaSyCR472mBTvr5hvtF99xZHaEgLXw34x-DmM',
  },
};

export default Object.freeze(defaultsDeep(config, base));
