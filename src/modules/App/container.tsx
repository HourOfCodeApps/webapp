import createMuiThemeV3 from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProviderV3 from '@material-ui/core/styles/MuiThemeProvider';

import CssBaseline from '@material-ui/core/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useInitAuth, AuthContext } from 'modules/Auth';

import isEnoughUserData from 'shared/utils/helpers/isEnoughUserData';

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

const App = () => {
  const {
    config,
    isFetched: isConfigFetched,
    error: configFetchingError,
  } = useFetchConfig();

  const auth = useInitAuth();

  // useEffect(() => {
  //   if (!auth) {
  //     window.location.href = '/'; // TODO: rewrite to router
  //   }
  // }, [Boolean(auth)]);

  const renderContent = () => {
    const { user } = auth;

    if (!user) {
      return <Public />;
    }

    if (!user.emailVerified) {
      return <ConfirmEmailFirst />;
    }

    // TODO: check incomplete profile case
    // // some special cases when user isn't completely registeted
    // if (authOld && (!user || !isEnoughUserData(user))) {
    //   return <CompleteSignUp user={user || { email: authOld.email }} />;
    // }

    if (user.teacher && !user.teacher.isApproved) {
      return <WaitingForApproval />;
    }

    return <Private user={user} />;
  };

  const isAppLoading = !isConfigFetched || !auth.isInitialized;

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProviderV3 theme={themeV3}>
        <CssBaseline />
        <ToastContainer />

        {isAppLoading ? (
          <AppLoading />
        ) : (
          <ConfigContext.Provider value={config!}>
            <AuthContext.Provider value={auth}>
              {renderContent()}
            </AuthContext.Provider>
          </ConfigContext.Provider>
        )}
      </MuiThemeProviderV3>
    </ThemeProvider>
  );
};

export default App;
