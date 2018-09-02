import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './main.css';

import Button from 'shared/components/Button';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div>Hello World</div>
      <Button>Press me</Button>
    </div>
  </Provider>,
  document.getElementById('app'),
);
