import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';

import Button from 'shared/components/Button';

ReactDOM.render(
  <div>
    <div>Hello World</div>
    <Button>Press me</Button>
  </div>,
  document.getElementById('app'),
);
