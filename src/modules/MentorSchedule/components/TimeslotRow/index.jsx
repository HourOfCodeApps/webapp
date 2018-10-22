import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
        <TableCell />
        <TableCell number>
          <Button onClick={handleCancel}>
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
