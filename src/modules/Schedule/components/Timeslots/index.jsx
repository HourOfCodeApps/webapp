import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TimeslotRow from '../TimeslotRow';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

const Timeslots = ({ timeslots }) => (
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
            // onApprove={handleApproveTeacherClick}
            // onDelete={handleDeleteClick}
          />
        ))}
      </TableBody>
    </Table>
  </Paper>
);

Timeslots.propTypes = {
  timeslots: PropTypes.instanceOf(Array).isRequired,
};


// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withStyles(styles),
//   withUser,
// )(Timeslots);

export default Timeslots;
