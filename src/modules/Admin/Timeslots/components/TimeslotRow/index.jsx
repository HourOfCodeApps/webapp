import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ApproveIcon from '@material-ui/icons/Done';
import RejectIcon from '@material-ui/icons/Clear';

const renderStatus = (timeslot) => {
  if (timeslot.isRejected) {
    return <span style={{ color: 'red' }}>Відхилено</span>;
  }

  if (!timeslot.isApproved) {
    return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
  }

  if (timeslot.mentorId && timeslot.mentor) {
    return <span style={{ color: 'blue' }}>Ментор: {timeslot.mentor.firstName} {timeslot.mentor.lastName} ({timeslot.mentor.phone})</span>;
  }

  return <span style={{ color: 'green' }}>Очікує ментора</span>;
};

class Timeslot extends React.Component {
  handleApprove = () => {
    this.props.onApprove(this.props.timeslot.id);
  }

  handleReject = () => {
    this.props.onReject(this.props.timeslot.id);
  }

  render() {
    const {
      handleApprove,
      handleReject,
      props: { timeslot },
    } = this;

    return (
      <TableRow>
        <TableCell>
          {DateTime.fromJSDate(timeslot.startTime).toLocaleString(DateTime.TIME_24_SIMPLE)}
        </TableCell>
        <TableCell>{timeslot.class}</TableCell>
        <TableCell>{timeslot.pupilsCount}</TableCell>
        <TableCell>{timeslot.notes}</TableCell>
        <TableCell>{renderStatus(timeslot)}</TableCell>
        <TableCell number>
          {!timeslot.isApproved && (
            <IconButton
              onClick={handleApprove}
              aria-label="Approve"
            >
              <ApproveIcon />
            </IconButton>
          )}
          {!timeslot.isApproved && (
            <IconButton
              onClick={handleReject}
              aria-label="Reject"
            >
              <RejectIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

Timeslot.propTypes = {
  timeslot: PropTypes.shape(PropTypes.object).isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default Timeslot;
