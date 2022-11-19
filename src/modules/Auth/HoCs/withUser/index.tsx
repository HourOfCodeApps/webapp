import { ComponentType } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectUser, selectStateInitLoaded } from '../../selectors';

/**
 * @deprecated use `useAuth` instead
 */
const withUser = (WrappedComponent: ComponentType) => (props: any) => (
  <WrappedComponent {...props} />
);

const mapStateToProps = createSelector(
  selectUser(),
  selectStateInitLoaded(),
  (user, userStateLoaded) => ({ user, userStateLoaded }),
);

/**
 * @deprecated use `useAuth` instead
 */
const composed = compose(connect(mapStateToProps), withUser);

export default composed;

export { withUser as withUserHoC };
