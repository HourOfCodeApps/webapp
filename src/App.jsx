import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Page404 from 'modules/ErrorPage/Page404';
import Dashboard from 'modules/Dashboard';
import AppWrapper from 'modules/App';
import Users from 'modules/Users';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: 'rgb(22, 150, 160)', // '#2196f3',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <AppWrapper>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/users" exact component={Users} />
          <Route component={Page404} />
        </Switch>
      </AppWrapper>
    </Router>
  </MuiThemeProvider>
);

export default App;
