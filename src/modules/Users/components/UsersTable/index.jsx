import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui-v3/core/styles';
import Table from '@material-ui-v3/core/Table';
import TableBody from '@material-ui-v3/core/TableBody';
import TableCell from '@material-ui-v3/core/TableCell';
import TableHead from '@material-ui-v3/core/TableHead';
import TableRow from '@material-ui-v3/core/TableRow';
import Paper from '@material-ui-v3/core/Paper';

import UsersTableRow from '../UsersTableRow';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

const UsersTable = ({ classes, users }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Roles</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <UsersTableRow key={user.uid} user={user} />
        ))}
      </TableBody>
    </Table>
  </Paper>
);

UsersTable.propTypes = {
  classes: PropTypes.instanceOf(Object),
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

UsersTable.defaultProps = {
  classes: {},
};

export default withStyles(styles)(UsersTable);
