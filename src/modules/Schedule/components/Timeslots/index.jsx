import React from 'react';
import PropTypes from 'prop-types';

import Table, {
  TableBody, TableCell, TableHead, TableRow,
} from 'shared/components/Table';

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
