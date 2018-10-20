import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchSchools } from '../../actions';

import {
  selectSchools,
  selectSchoolsFetching,
  selectSchoolsFetchingError,
  selectSchoolsMap,
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
  selectSchoolsMap(),
  (
    schools, schoolsFetching, schoolsFetchingError, schoolsMap,
  ) => ({
    schools, schoolsFetching, schoolsFetchingError, schoolsMap,
  }),
);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSchools,
);

export { withSchools as withSchoolsHoC };
