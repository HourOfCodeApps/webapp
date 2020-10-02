import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Typography from '@material-ui-v3/core/Typography';

import { fetchUsers } from './actions';
import {
  selectUsers,
  selectUsersFetching,
  selectUsersFetchingError,
} from './selectors';

import UsersTable from './components/UsersTable';

class Users extends React.Component {
  propTypes = {
    onFetchUsers: PropTypes.func.isRequired,
    users: PropTypes.shape(PropTypes.array).isRequired,
    usersFetching: PropTypes.bool.isRequired,
    usersFetchingError: PropTypes.shape(PropTypes.object).isRequired,
  };

  componentDidMount() {
    const { onFetchUsers } = this.props;
    onFetchUsers();
  }

  render() {
    const { users, usersFetching, usersFetchingError } = this.props;
    return (
      <React.Fragment>
        <Typography variant="display1" gutterBottom>
          Users
        </Typography>

        {usersFetching && (<Typography variant="p">Loading...</Typography>)}
        {usersFetchingError && (<Typography variant="p">{usersFetchingError.message}</Typography>)}
        {!usersFetching && !usersFetchingError && (
          <UsersTable users={users} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  selectUsers(),
  selectUsersFetching(),
  selectUsersFetchingError(),
  (
    users,
    usersFetching,
    usersFetchingError,
  ) => ({
    users,
    usersFetching,
    usersFetchingError,
  }),
);

const mapDispatchToProps = {
  onFetchUsers: fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
export { Users as UsersComponent };
