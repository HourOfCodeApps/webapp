import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createMuiThemeV3 from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProviderV3 from '@material-ui/core/styles/MuiThemeProvider';

import CssBaseline from '@material-ui/core/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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
import { ConfigContext, useFetchConfig } from 'modules/Config';

const themeV3 = createMuiThemeV3({
  palette: {
    // type: 'dark',
    primary: {
      main: 'rgb(22, 150, 160)',
    },
  },
});

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
  palette: {
    primary: {
      main: 'rgb(22, 150, 160)',
    },
  },
});

type Props = {
  auth?: {
    emailVerified: boolean;
    email: string;
  };
  authStateLoaded: boolean;
  onAuthStateInit: VoidFunction;
  user?: {
    teacher?: {
      isApproved: boolean;
    };
  };
  userLoading: boolean;
  signingUp: boolean;
};

const App = ({
  auth,
  user,
  userLoading,
  authStateLoaded,
  signingUp,
  onAuthStateInit,
}: Props) => {
  const {
    config,
    isFetched: isConfigFetched,
    error: configFetchingError,
  } = useFetchConfig();

  useEffect(() => {
    onAuthStateInit();
  }, []);

  // useEffect(() => {
  //   if (!auth) {
  //     window.location.href = '/'; // TODO: rewrite to router
  //   }
  // }, [Boolean(auth)]);

  const renderContent = () => {
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

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProviderV3 theme={themeV3}>
        <CssBaseline />
        <ToastContainer />

        {!isConfigFetched ? (
          <AppLoading />
        ) : (
          <ConfigContext.Provider value={config!}>
            {renderContent()}
          </ConfigContext.Provider>
        )}
      </MuiThemeProviderV3>
    </ThemeProvider>
  );
};

const mapStateToProps = createSelector(
  selectAuth(),
  selectUser(),
  selectUserLoading(),
  selectStateInitLoaded(),
  selectSigningUp(),
  (auth, user, userLoading, authStateLoaded, signingUp) => ({
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
