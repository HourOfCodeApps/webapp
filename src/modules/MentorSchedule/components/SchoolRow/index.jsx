import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import upperFirst from 'lodash/upperFirst';

import TimeslotRow from '../TimeslotRow';

const styles = theme => ({
  root: {
    // width: '100%',
    marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
  },
});

class SchoolRow extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {
      onCancelTimeslot,
      school,
      timeslots,
      classes,
      date,
    } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="title" gutterBottom>
          {upperFirst(DateTime.fromISO(date).setLocale('uk').toFormat('EEEE, dd.MM'))}
          .&nbsp;
          {school.name}
        </Typography>
        <Typography variant="subheading" style={{ marginBottom: 20 }}>
          {school.teacher.phone}
          {' '}
          {school.teacher.firstName}
          {' '}
          {school.teacher.lastName}
,
          {' '}
          {school.city}
          {' '}
          {school.addressStreet}
,
          {' '}
          {school.addressBuilding}
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow selected>
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
      </div>
    );
  }
}

SchoolRow.propTypes = {
  timeslots: PropTypes.instanceOf(Array).isRequired,
  onCancelTimeslot: PropTypes.func.isRequired,
};

export default withStyles(styles)(SchoolRow);
