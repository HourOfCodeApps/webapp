import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Page404 from 'modules/ErrorPage/Page404';
import Dashboard from 'modules/Dashboard';
import AppWrapper from 'modules/App';
import Users from 'modules/Users';

const App = () => (
  <Router>
    <AppWrapper>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/users" exact component={Users} />
        <Route component={Page404} />
      </Switch>
    </AppWrapper>
  </Router>
);

export default App;
