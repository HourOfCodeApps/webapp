import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Auth, {
  selectAuth,
  selectStateInitLoaded,
  selectUser,
  selectUserLoading,
  authStateInit,
  logout,
  Signup,
} from 'modules/Auth';

import Header from './components/Header';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.shape(PropTypes.object).isRequired,
    authStateLoaded: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    classes: PropTypes.shape(PropTypes.object).isRequired,
    onAuthStateInit: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.shape(PropTypes.object),
    userLoading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    user: null,
  }

  componentDidMount() {
    const { onAuthStateInit } = this.props;
    onAuthStateInit();
  }

  render() {
    const {
      props: {
        auth,
        children,
        classes,
        onLogout,
        user,
        userLoading,
        authStateLoaded,
      },
    } = this;

    if (!authStateLoaded || userLoading) {
      return <div>Loading</div>;
    }

    if (!auth) {
      return <Auth />;
    }

    if (!user) {
      // user signup process
      return <Signup auth={auth} />;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header onLogout={onLogout} user={user} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  selectAuth(),
  selectUser(),
  selectUserLoading(),
  selectStateInitLoaded(),
  (
    auth,
    user,
    userLoading,
    authStateLoaded,
  ) => ({
    auth,
    user,
    userLoading,
    authStateLoaded,
  }),
);

const mapDispatchToProps = {
  onAuthStateInit: authStateInit,
  onLogout: logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
export { App as AppComponent };
