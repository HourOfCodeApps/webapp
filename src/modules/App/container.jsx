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
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Page404 from 'modules/ErrorPage/Page404';
import Dashboard from 'modules/Dashboard';
import Schools, { School, SchoolCreate, SchoolEdit } from 'modules/Schools';
// import { Teachers } from 'modules/Users';
import Schedule from 'modules/Schedule';
import MentorSchedule, { MentorScheduleApply } from 'modules/MentorSchedule';
import Profile from 'modules/Profile';
import {
  Mentor as AdminMentor,
  Mentors as AdminMentors,
  Teachers as AdminTeachers,
  Timeslots as AdminTimeslots,
  User as AdminUser,
  Users as AdminUsers,
} from 'modules/Admin';

import {
  selectAuth,
  selectStateInitLoaded,
  selectUser,
  selectUserLoading,
  authStateInit,
  CompleteSignUp,
  selectSigningIn,
  selectSigningInError,
  selectSigningUp,
  selectSigningUpError,
} from 'modules/Auth';

import isEnoughUserData from 'shared/utils/helpers/isEnoughUserData';

import WelcomePage from './containers/WelcomePage';
import AppWrapper from './containers/AppWrapper';
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

const Public = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={WelcomePage} />
      {/* <Route component={Page404} /> */}
      <Redirect to="/" />
    </Switch>
  </Router>
);

const Private = ({ user }) => (
  <Router>
    <AppWrapper>
      <Switch>
        {user.admin && [
          <Route path="/" exact component={Dashboard} />,
          <Route path="/schools" exact component={Schools} />,
          <Route path="/school/new" exact component={SchoolCreate} />,
          <Route path="/school/:id" exact component={School} />,
          <Route path="/school/:id/edit" exact component={SchoolEdit} />,
          <Route path="/teachers" exact component={AdminTeachers} />,
          <Route path="/timeslots" exact component={AdminTimeslots} />,
          <Route path="/mentors" exact component={AdminMentors} />,
          <Route path="/mentor/:id" exact component={AdminMentor} />,
          <Route path="/users" exact component={AdminUsers} />,
          <Route path="/users/:id" exact component={AdminUser} />,
        ]}
        {user.teacher && (
          <Route path="/" exact component={Schedule} />
        )}
        {user.mentor && [
          <Route path="/" exact component={MentorSchedule} />,
          <Route path="/apply" exact component={MentorScheduleApply} />,
        ]}
        <Route path="/me" exact component={Profile} />
        <Route component={Page404} />
      </Switch>
    </AppWrapper>
  </Router>
);

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Object),
    authStateLoaded: PropTypes.bool.isRequired,
    onAuthStateInit: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Object),
    userLoading: PropTypes.bool.isRequired,
    signingIn: PropTypes.bool.isRequired,
    signingInError: PropTypes.instanceOf(Object),
    signingUp: PropTypes.bool.isRequired,
    signingUpError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    auth: null,
    user: null,
    signingInError: null,
    signingUpError: null,
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
      console.log(user, userLoading, isEnoughUserData(user));
      return <CompleteSignUp user={user || { email: auth.email }} />;
    }

    if (auth && user && user.teacher && !user.teacher.isApproved) {
      return <WaitingForApproval />;
    }

    if (auth && user) {
      return <Private user={user} />;
    }

    // return <AuthAdmin />;
  };

  render() {
    const { renderContent } = this;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        {renderContent()}
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = createSelector(
  selectAuth(),
  selectUser(),
  selectUserLoading(),
  selectStateInitLoaded(),
  selectSigningIn(),
  selectSigningInError(),
  selectSigningUp(),
  selectSigningUpError(),
  (
    auth,
    user,
    userLoading,
    authStateLoaded,
    signingIn,
    signingInError,
    signingUp,
    signingUpError,
  ) => ({
    auth,
    user,
    userLoading,
    authStateLoaded,
    signingIn,
    signingInError,
    signingUp,
    signingUpError,
  }),
);

const mapDispatchToProps = {
  onAuthStateInit: authStateInit,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export { App as AppComponent };
