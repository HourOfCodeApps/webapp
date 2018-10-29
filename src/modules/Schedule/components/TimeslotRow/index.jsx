import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const renderStatus = (timeslot) => {
  if (!timeslot.isApproved) {
    return <span style={{ color: 'red' }}>Очікує підтвердження</span>;
  }

  if (timeslot.mentorId && timeslot.mentor) {
    return <span style={{ color: 'blue' }}>Ментор: {timeslot.mentor.firstName} {timeslot.mentor.lastName} ({timeslot.mentor.phone})</span>;
  }

  return <span style={{ color: 'green' }}>Очікує ментора</span>;
};

class Timeslot extends React.Component {
  handleDelete = () => {
    this.props.onDelete(this.props.timeslot.id);
  }

  render() {
    const {
      handleDelete,
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
          <IconButton
            onClick={handleDelete}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

Timeslot.propTypes = {
  timeslot: PropTypes.shape(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Timeslot;
