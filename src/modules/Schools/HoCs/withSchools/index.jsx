import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchSchools } from '../../actions';

import {
  selectSchools,
  selectSchoolsFetching,
  selectSchoolsFetchingError,
} from '../../selectors';

const withSchools = WrappedComponent => class withSchoolsHoC extends React.Component {
  componentDidMount() {
    const { onFetchSchools } = this.props;
    onFetchSchools();
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

const mapDispatchToProps = {
  onFetchSchools: fetchSchools,
};

const mapStateToProps = createSelector(
  selectSchools(),
  selectSchoolsFetching(),
  selectSchoolsFetchingError(),
  (
    schools, schoolsFetching, schoolsFetchingError,
  ) => ({
    schools, schoolsFetching, schoolsFetchingError,
  }),
);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSchools,
);

export { withSchools as withSchoolsHoC };
