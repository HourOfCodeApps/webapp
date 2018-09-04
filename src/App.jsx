import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Page404 from 'modules/ErrorPage/Page404';
import Dashboard from 'modules/Dashboard';
import AppWrapper from 'modules/App';

const App = () => (
  <AppWrapper>
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route component={Page404} />
      </Switch>
    </Router>
  </AppWrapper>
);

export default App;
