import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { TableCell, TableRow } from 'shared/components/Table';

import {
  TIMESLOT_STATUS_NEEDS_APPROVE,
  TIMESLOT_STATUS_NEEDS_MENTOR,
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

  if (timeslot.status === TIMESLOT_STATUS_HAS_MENTOR) {
    return (
      <span style={{ color: 'blue' }}>
        Підтверджено
      </span>
    );
  }

  if (timeslot.status === TIMESLOT_STATUS_REJECTED) {
    return <span style={{ color: 'red' }}>Відхилено</span>;
  }

  return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
};

class Timeslot extends React.Component {
  handleDelete = () => {
    this.props.onDelete(this.props.timeslot.id);
  }

  render() {
    const {
      props: { timeslot },
    } = this;

    return (
      <TableRow>
        <TableCell>
          {DateTime.fromJSDate(timeslot.startTime).toFormat('dd LLL yyyy, HH:mm')}
        </TableCell>
        <TableCell>{timeslot.class}</TableCell>
        <TableCell>{timeslot.pupilsCount}</TableCell>
        <TableCell>{timeslot.notes}</TableCell>
        <TableCell>{renderStatus(timeslot)}</TableCell>
      </TableRow>
    );
  }
}

Timeslot.propTypes = {
  timeslot: PropTypes.shape(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Timeslot;
