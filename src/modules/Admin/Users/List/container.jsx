import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Typography from 'shared/components/Typography';
import Grid from 'shared/components/Grid';

import Loading from 'shared/components/Loading';
import Paper from 'shared/components/Paper';
import Table, {
  TableBody, TableCell, TableHead, TableRow,
} from 'shared/components/Table';
import { fetchUsers } from './actions';

import {
  selectAllTimeslotsCount,
  selectUsers,
  selectUsersFetching,
  selectUsersFetchingError,
} from './selectors';

import UserRow from './components/UserRow';

class Users extends React.Component {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    const {
      props: {
        // allTimeslotsCount,
        users,
        usersFetching,
        usersFetchingError,
      },
    } = this;

    return (
      <React.Fragment>
        {/* <Grid container justify="space-between" alignItems="flex-end"> */}
          {/* <Grid item xs={12} md={6}> */}
            <Typography variant="display1" gutterBottom>
              Користувачі
            </Typography>
          {/* </Grid> */}
          {/* <Grid item xs={12} md={6}> */}
            {/* <Typography variant="subheading" gutterBottom align="right">
              Кількість менторів:&nbsp;
              {users.length}
              {/* ,&nbsp;Кількість уроків:&nbsp; */}
              {/* {allTimeslotsCount} */}
            {/* </Typography> */} */}
          {/* </Grid> */}
        {/* </Grid> */}

        {usersFetching && <Loading />}

        {usersFetchingError && <div>{usersFetchingError.message}</div>}

        {!usersFetching && !usersFetchingError && (
          <Paper>
            <Table>
              <TableHead>
                <TableRow selected>
                  <TableCell>Ім&apos;я</TableCell>
                  <TableCell>Пошта</TableCell>
                  <TableCell>Телефон</TableCell>
                  <TableCell>
                    Кількість уроків
                    <br />
                    (підтверджено / всього)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <UserRow
                    key={user.uid}
                    user={user}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  // allTimeslotsCount: PropTypes.number.isRequired,
  onFetchUsers: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(Array),
  usersFetching: PropTypes.bool.isRequired,
  usersFetchingError: PropTypes.instanceOf(Object),
};

Users.defaultProps = {
  users: [],
  usersFetchingError: null,
};

const mapStateToProps = createSelector(
  selectAllTimeslotsCount(),
  selectUsers(),
  selectUsersFetching(),
  selectUsersFetchingError(),
  (
    allTimeslotsCount,
    users,
    usersFetching,
    usersFetchingError,
  ) => ({
    allTimeslotsCount,
    users,
    usersFetching,
    usersFetchingError,
  }),
);

const mapDispatchToProps = {
  onFetchUsers: fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
