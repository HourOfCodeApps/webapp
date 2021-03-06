import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TableCell from '@material-ui-v3/core/TableCell';
import TableRow from '@material-ui-v3/core/TableRow';
import yellow from '@material-ui-v3/core/colors/yellow';

import isEnoughUserData from 'shared/utils/helpers/isEnoughUserData';

const MentorRow = ({ mentor }) => (
  <TableRow
    style={{
      backgroundColor: isEnoughUserData(mentor) ? 'transparent' : yellow[500],
    }}
  >
    <TableCell>
      <Link to={`/mentor/${mentor.uid}`}>
        {mentor.profile.firstName}
        &nbsp;
        {mentor.profile.lastName}
      </Link>
    </TableCell>
    <TableCell>
      {mentor.profile.email}
    </TableCell>
    <TableCell>
      {mentor.profile.phone}
    </TableCell>
    <TableCell>
      {mentor.mentor.approvedTimeslotsCount || 0}
      &nbsp;/&nbsp;
      {mentor.mentor.timeslotsCount || 0}
    </TableCell>
  </TableRow>
);

MentorRow.propTypes = {
  mentor: PropTypes.shape(PropTypes.object).isRequired,
};

export default MentorRow;
