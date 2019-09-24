import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import ApproveIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import { IconButton } from 'shared/components/Buttons';
import { TableCell, TableRow } from 'shared/components/Table';

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

  if (timeslot.status === TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE) {
    return (
      <span style={{ color: 'blue' }}>
        Ментор очікує на підтвердження:
        {timeslot.mentor.firstName}
        {' '}
        {timeslot.mentor.lastName}
        {' '}
(
        {timeslot.mentor.phone}
)
      </span>
    );
    // return <span style={{ color: 'blue' }}>Ментор очікує на підтвердження</span>;
  }

  if (timeslot.status === TIMESLOT_STATUS_HAS_MENTOR) {
    return (
      <span style={{ color: 'blue' }}>
        Ментор:
        {timeslot.mentor.firstName}
        {' '}
        {timeslot.mentor.lastName}
        {' '}
        (
        {timeslot.mentor.phone}
        )
      </span>
    );
  }

  if (timeslot.status === TIMESLOT_STATUS_REJECTED) {
    return <span style={{ color: 'red' }}>Відхилено</span>;
  }

  return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
};

class Timeslot extends React.Component {
  handleApprove = () => {
    this.props.onApprove(this.props.timeslot.id);
  }

  handleDelete = () => {
    this.props.onDelete(this.props.timeslot.id);
  }

  render() {
    const {
      handleApprove,
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
        <TableCell numeric>
          {(
            timeslot.status === TIMESLOT_STATUS_NEEDS_APPROVE
            || timeslot.status === TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE
          ) && (
            <IconButton
              onClick={handleApprove}
              aria-label="Approve"
            >
              <ApproveIcon />
            </IconButton>
          )}
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
  onDelete: PropTypes.func.isRequired,
};

export default Timeslot;
