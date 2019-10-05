import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import WarningIcon from '@material-ui/icons/Warning';

import { yellow } from 'shared/colors';
// import isEnoughUserData from 'shared/utils/helpers/isEnoughUserData';
import {
  TableCell, TableRow,
} from 'shared/components/Table';

const isEnoughUserData = (user) => {
  if (!user.displayName || !user.displayName.trim()) {
    return false;
  }

  if (!user.email || !user.emailVerified) {
    return false;
  }

  if (!user.phoneNumber) {
    return false;
  }

  return true;
};

const UserRow = ({ user }) => (
  <TableRow
    style={{
      backgroundColor: isEnoughUserData(user) ? 'transparent' : yellow,
    }}
  >
    <TableCell>
      <Link to={`/user/${user.uid}`}>
        {user.displayName}
      </Link>
    </TableCell>
    <TableCell>
      {!user.emailVerified && <WarningIcon />}
      {user.email}
    </TableCell>
    <TableCell>
      {user.phoneNumber}
    </TableCell>
    <TableCell>
      Roles
    </TableCell>
  </TableRow>
);

UserRow.propTypes = {
  user: PropTypes.shape(PropTypes.object).isRequired,
};

export default UserRow;
