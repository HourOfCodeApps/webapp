import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ApproveIcon from '@material-ui/icons/Done';
import RejectIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  TIMESLOT_STATUS_NEEDS_APPROVE,
  TIMESLOT_STATUS_NEEDS_MENTOR,
  TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE,
  TIMESLOT_STATUS_HAS_MENTOR,
  TIMESLOT_STATUS_REJECTED,
} from 'shared/constants/timeslots';

const renderStatus = (timeslot) => {
  if (!timeslot.status || timeslot.status === TIMESLOT_STATUS_NEEDS_APPROVE) {
    return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
  }

  if (timeslot.status === TIMESLOT_STATUS_NEEDS_MENTOR) {
    return <span style={{ color: 'green' }}>Очікує ментора</span>;
  }

  if (timeslot.status === TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE) { // && timeslot.mentorId && timeslot.mentor) {
    return <span style={{ color: 'blue' }}>Ментор очікує на підтвердження: {timeslot.mentor.firstName} {timeslot.mentor.lastName} ({timeslot.mentor.phone})</span>;
    // return <span style={{ color: 'blue' }}>Ментор очікує на підтвердження</span>;
  }

  if (timeslot.status === TIMESLOT_STATUS_HAS_MENTOR) { // && timeslot.mentorId && timeslot.mentor) {
    return <span style={{ color: 'blue' }}>Ментор: {timeslot.mentor.firstName} {timeslot.mentor.lastName} ({timeslot.mentor.phone})</span>;
    // return <span style={{ color: 'blue' }}>Ментор</span>;
  }

  if (timeslot.status === TIMESLOT_STATUS_REJECTED) {
    return <span style={{ color: 'red' }}>Відхилено</span>;
  }

  // if (timeslot.mentorId && timeslot.mentor) {
  //   return <span style={{ color: 'blue' }}>Ментор: {timeslot.mentor.firstName} {timeslot.mentor.lastName} ({timeslot.mentor.phone})</span>;
  // }

  return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
};

// const renderStatus = (timeslot) => {
//   if (!timeslot.status || timeslot.status === TIMESLOT_STATUS_NEEDS_APPROVE) {
//     return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
//   }

//   if (timeslot.status === TIMESLOT_STATUS_NEEDS_MENTOR) {
//     return <span style={{ color: 'green' }}>Очікує ментора</span>;
//   }

//   if (
//     timeslot.status === TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE
//   ) {
//     return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
//   }

//   console.log(timeslot);
//   if (timeslot.status === TIMESLOT_STATUS_HAS_MENTOR) {
//     return <span style={{ color: 'blue' }}>Підтверджено</span>;
//   }

//   if (timeslot.status === TIMESLOT_STATUS_REJECTED) {
//     return <span style={{ color: 'red' }}>Відхилено</span>;
//   }

//   // if (timeslot.mentorId && timeslot.mentor) {
//   //   return <span style={{ color: 'blue' }}>Ментор: {timeslot.mentor.firstName} {timeslot.mentor.lastName} ({timeslot.mentor.phone})</span>;
//   // }

//   return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
// };

class Timeslot extends React.Component {
  handleApprove = () => {
    this.props.onApprove(this.props.timeslot.id);
  }

  handleReject = () => {
    this.props.onReject(this.props.timeslot.id);
  }

  handleDelete = () => {
    this.props.onDelete(this.props.timeslot.id);
  }

  render() {
    const {
      handleApprove,
      handleReject,
      props: { school, timeslot },
    } = this;

    return (
      <TableRow>
        <TableCell>
          {DateTime.fromJSDate(timeslot.startTime).toFormat('dd LLL yyyy, HH:mm')}
        </TableCell>
        <TableCell>
          {/* {timeslot.schoolId} */}
          <Link to={`/school/${timeslot.schoolId}`}>{school.name}</Link>
        </TableCell>
        <TableCell>{timeslot.class}</TableCell>
        <TableCell>{timeslot.pupilsCount}</TableCell>
        <TableCell>{timeslot.notes}</TableCell>
        <TableCell>{renderStatus(timeslot)}</TableCell>
        <TableCell number>
          {
            (timeslot.status === TIMESLOT_STATUS_NEEDS_APPROVE || timeslot.status === TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE)
            && (
            <IconButton
              onClick={handleApprove}
              aria-label="Approve"
            >
              <ApproveIcon />
            </IconButton>
            )
          }
          {/* {!timeslot.isApproved && (
            <IconButton
              onClick={handleReject}
              aria-label="Reject"
            >
              <RejectIcon />
            </IconButton>
          )} */}
          {/* {!timeslot.isApproved && ( */}
          <IconButton
            onClick={this.handleDelete}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
          {/* )} */}
        </TableCell>
      </TableRow>
    );
  }
}

Timeslot.propTypes = {
  timeslot: PropTypes.shape(PropTypes.object).isRequired,
  school: PropTypes.shape(PropTypes.object).isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default Timeslot;
