import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  fetchSchools,
} from './actions';

import {
  selectSchools,
  selectSchoolsFetching,
  selectSchoolsFetchingError,
} from './selectors';

import SchoolRow from './components/SchoolRow';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

class Schools extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    onFetchSchools: PropTypes.func.isRequired,
    schools: PropTypes.instanceOf(Array),
    schoolsFetching: PropTypes.bool.isRequired,
    schoolsFetchingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    schools: [],
    schoolsFetchingError: null,
  }

  componentDidMount() {
    const { onFetchSchools } = this.props;
    onFetchSchools();
  }

  render() {
    const {
      props: {
        schools,
        schoolsFetching,
        schoolsFetchingError,
      },
    } = this;

    if (schoolsFetching) {
      return <div>Loading</div>;
    }

    if (schoolsFetchingError) {
      return <div>{schoolsFetchingError.message}</div>;
    }

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Назва</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {schools.map(s => <SchoolRow key={s.id} school={s} />)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

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

const mapDispatchToProps = {
  onFetchSchools: fetchSchools,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Schools));
