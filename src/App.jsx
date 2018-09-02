import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Page404 from 'modules/ErrorPage/Page404';
import Home from 'modules/Home';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route component={Page404} />
    </Switch>
  </Router>
);

export default App;
