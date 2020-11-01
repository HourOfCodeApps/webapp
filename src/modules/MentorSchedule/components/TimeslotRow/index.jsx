import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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

  if (
    timeslot.status === TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE
  ) {
    return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
  }

  if (timeslot.status === TIMESLOT_STATUS_HAS_MENTOR) {
    return <span style={{ color: 'blue' }}>Підтверджено</span>;
  }

  if (timeslot.status === TIMESLOT_STATUS_REJECTED) {
    return <span style={{ color: 'red' }}>Відхилено</span>;
  }

  // if (timeslot.mentorId && timeslot.mentor) {
  //   return <span style={{ color: 'blue' }}>Ментор: {timeslot.mentor.firstName} {timeslot.mentor.lastName} ({timeslot.mentor.phone})</span>;
  // }

  return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
};

class Timeslot extends React.Component {
  handleCancel = () => {
    this.props.onCancel(this.props.timeslot.id);
  }

  render() {
    const {
      handleCancel,
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
        <TableCell>
          <Button onClick={handleCancel} variant="outlined">
            Відмінити
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

Timeslot.propTypes = {
  timeslot: PropTypes.shape(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Timeslot;
