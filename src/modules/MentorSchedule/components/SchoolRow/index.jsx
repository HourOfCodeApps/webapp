import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TimeslotRow from '../TimeslotRow';

class SchoolRow extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { onCancelTimeslot, school, timeslots } = this.props;

    return (
      <React.Fragment>
        {school.name}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Час початку</TableCell>
                <TableCell>Клас</TableCell>
                <TableCell>Кількість учнів</TableCell>
                <TableCell>Коментар</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeslots.map(t => (
                <TimeslotRow
                  key={t.id}
                  timeslot={t}
                  onCancel={onCancelTimeslot}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

SchoolRow.propTypes = {
  timeslots: PropTypes.instanceOf(Array).isRequired,
  onCancelTimeslot: PropTypes.func.isRequired,
};

export default SchoolRow;
