import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import CompleteSignUp from './containers/CompleteSignUp';

import sagas from './sagas';
import reducer from './reducer';

import { authStateInit, signOut, loadUserSuccess } from './actions';
import {
  selectAuth,
  selectUser,
  selectUserLoading,
  selectStateInitLoaded,
  selectSigningIn,
  selectSigningInError,
  selectSigningUp,
  selectSigningUpError,
} from './selectors';

import withUser from './HoCs/withUser';

export type { User } from './types';
export { AuthContext } from './types';
export { default as useAuth } from './useAuth';
export { default as useInitAuth} from './useInitAuth';

export default SignIn;
export {
  authStateInit,
  CompleteSignUp,
  signOut,
  reducer,
  sagas,
  selectAuth,
  selectStateInitLoaded,
  selectUser,
  selectUserLoading,
  selectSigningIn,
  selectSigningInError,
  selectSigningUp,
  selectSigningUpError,
  SignIn,
  SignUp,
  withUser,
  loadUserSuccess,
};
