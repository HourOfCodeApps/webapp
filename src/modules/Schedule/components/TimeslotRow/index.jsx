/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateTime } from 'luxon';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ApproveIcon from '@material-ui/icons/Done';

class Timeslot extends React.Component {
  // handleApprove = () => {
  //   const { teacher, onApprove } = this.props;
  //   onApprove(teacher.uid);
  // }

  render() {
    const {
      // handleApprove,
      props: { timeslot },
    } = this;

    console.log(DateTime.fromJSDate(timeslot.startTime));
    return (
      <TableRow>
        <TableCell>{DateTime.fromJSDate(timeslot.startTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</TableCell>
        <TableCell>{timeslot.class}</TableCell>
        <TableCell>{timeslot.pupilsCount}</TableCell>
        <TableCell>{timeslot.notes}</TableCell>
        <TableCell />
        <TableCell />
        {/* <TableCell component="th" scope="row">
          {teacher.id}
          {teacher.profile.firstName}
          &nbsp;
          {teacher.profile.lastName}
        </TableCell>
        <TableCell>
          {teacher.teacher.schoolId}
        </TableCell>
        <TableCell>
          {teacher.profile.email}
        </TableCell>
        <TableCell>
          {teacher.profile.phone}
        </TableCell>
        <TableCell number>
          {!teacher.teacher.isApproved && (
            <IconButton
              onClick={handleApprove}
              aria-label="Approve"
            >
              <ApproveIcon />
            </IconButton>
          )}
        </TableCell> */}
      </TableRow>
    );
  }
}

Timeslot.propTypes = {
  timeslot: PropTypes.shape(PropTypes.object).isRequired,
  // onApprove: PropTypes.func.isRequired,
};

export default Timeslot;
