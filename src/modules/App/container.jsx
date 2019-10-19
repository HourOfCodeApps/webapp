import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  selectAuth,
  selectStateInitLoaded,
  selectUser,
  selectUserLoading,
  authStateInit,
  CompleteSignUp,
  selectSigningUp,
} from 'modules/Auth';

import isEnoughUserData from 'shared/utils/helpers/isEnoughUserData';

import AppLoader from './containers/AppLoader';

import Public from './containers/Public';
import Private from './containers/Private';
import ConfirmEmailFirst from './components/ConfirmEmailFirst';
import WaitingForApproval from './components/WaitingForApproval';
import AppLoading from './components/AppLoading';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: 'rgb(22, 150, 160)',
    },
  },
});

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Object),
    authStateLoaded: PropTypes.bool.isRequired,
    onAuthStateInit: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Object),
    userLoading: PropTypes.bool.isRequired,
    signingUp: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    auth: null,
    user: null,
  }

  componentDidMount() {
    const { onAuthStateInit } = this.props;
    onAuthStateInit();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth && !this.props.auth) {
      window.location.href = '/';
    }
  }

  renderContent = () => {
    const {
      props: {
        auth,
        user,
        userLoading,
        authStateLoaded,
        signingUp,
      },
    } = this;

    if (!authStateLoaded || userLoading || signingUp) {
      return <AppLoading />;
    }

    if (!auth) {
      return <Public />;
    }

    if (!auth.emailVerified) {
      return <ConfirmEmailFirst />;
    }

    // some special cases when user isn't completely registeted
    if (auth && (!user || !isEnoughUserData(user))) {
      return <CompleteSignUp user={user || { email: auth.email }} />;
    }

    if (auth && user && user.teacher && !user.teacher.isApproved) {
      return <WaitingForApproval />;
    }

    if (auth && user) {
      return <Private user={user} />;
    }

    return <AppLoading />;
  };

  render() {
    const { renderContent } = this;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {/* <AppLoader> */}
          <ToastContainer />
          {renderContent()}
        {/* </AppLoader> */}
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = createSelector(
  selectAuth(),
  selectUser(),
  selectUserLoading(),
  selectStateInitLoaded(),
  selectSigningUp(),
  (
    auth,
    user,
    userLoading,
    authStateLoaded,
    signingUp,
  ) => ({
    auth,
    user,
    userLoading,
    authStateLoaded,
    signingUp,
  }),
);

const mapDispatchToProps = {
  onAuthStateInit: authStateInit,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export { App as AppComponent };
