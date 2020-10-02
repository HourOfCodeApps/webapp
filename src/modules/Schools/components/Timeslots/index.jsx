import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui-v3/core/Table';
import TableBody from '@material-ui-v3/core/TableBody';
import TableCell from '@material-ui-v3/core/TableCell';
import TableHead from '@material-ui-v3/core/TableHead';
import TableRow from '@material-ui-v3/core/TableRow';
import Paper from '@material-ui-v3/core/Paper';

import TimeslotRow from '../TimeslotRow';

const Timeslots = ({ onDeleteTimeslot, timeslots }) => (
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
            onDelete={onDeleteTimeslot}
          />
        ))}
      </TableBody>
    </Table>
  </Paper>
);

Timeslots.propTypes = {
  timeslots: PropTypes.instanceOf(Array).isRequired,
  onDeleteTimeslot: PropTypes.func.isRequired,
};

export default Timeslots;
