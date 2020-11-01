import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class Timeslot extends React.PureComponent {
  handleApply = () => {
    this.props.onApply(this.props.timeslot.id);
  }

  render() {
    const {
      handleApply,
      props: { timeslot },
    } = this;

    return (
      <TableRow key={timeslot.id}>
        <TableCell component="th" scope="row">{DateTime.fromJSDate(timeslot.startTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</TableCell>
        <TableCell>{timeslot.class}</TableCell>
        <TableCell>{timeslot.pupilsCount}</TableCell>
        <TableCell>{timeslot.notes}</TableCell>
        <TableCell>
          <Button onClick={handleApply} variant="outlined">
            Я прийду на урок
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

Timeslot.propTypes = {
  timeslot: PropTypes.shape(PropTypes.object).isRequired,
  onApply: PropTypes.func.isRequired,
};

export default Timeslot;
