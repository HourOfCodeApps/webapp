import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TimeslotRow from '../TimeslotRow';

const Timeslots = ({ onDeleteTimeslot, timeslots }) => (
  // <Paper>
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
          onDelete={onDeleteTimeslot}
        />
      ))}
    </TableBody>
  </Table>
  // </Paper>
);

Timeslots.propTypes = {
  timeslots: PropTypes.instanceOf(Array).isRequired,
  onDeleteTimeslot: PropTypes.func.isRequired,
};

export default Timeslots;
