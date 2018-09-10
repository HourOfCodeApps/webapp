import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  selectUser,
  selectStateInitLoaded,
} from '../../selectors';

const withAuth = WrappedComponent => props => (
  <WrappedComponent {...props} />
);

const mapStateToProps = createSelector(
  selectUser(),
  selectStateInitLoaded(),
  (user, userStateLoaded) => ({ user, userStateLoaded }),
);

export default compose(
  connect(mapStateToProps),
  withAuth,
);

export { withAuth as withAuthHoC };
