import container from './container';

/**
 * Redux
 */
import sagas from './sagas';
import reducer from './reducer';

import { authStateInit, logout } from './actions';
import { selectUser, selectStateInitLoaded } from './selectors';

import withAuth from './HoCs/withAuth';
// import PrivateRoute from './containers/PrivateRoute';

export default container;
export {
  // PrivateRoute,
  authStateInit,
  logout,
  sagas,
  reducer,
  selectStateInitLoaded,
  selectUser,
  withAuth,
};
