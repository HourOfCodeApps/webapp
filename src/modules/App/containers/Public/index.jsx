import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import WelcomePage from '../WelcomePage';

const Public = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={WelcomePage} />
      {/* <Route component={Page404} /> */}
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default Public;
