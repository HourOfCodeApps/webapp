import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Page404 from 'modules/ErrorPage/Page404';
import Home from 'modules/Home';
import Dashboard from 'modules/Dashboard';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route component={Page404} />
    </Switch>
  </Router>
);

export default App;
