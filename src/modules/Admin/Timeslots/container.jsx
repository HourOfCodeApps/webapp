import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';

import {
  approveTimeslots,
  fetchTimeslots,
} from './actions';

import {
  selectTimeslots,
  selectTimeslotsApproving,
  selectTimeslotsApprovingError,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
} from './selectors';

import TimeslotRow from './components/TimeslotRow';

class Timeslots extends React.Component {
  componentDidMount() {
    this.props.onFetchTimeslots();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timeslotsApproving && !this.props.timeslotsApproving) {
      if (this.props.timeslotsApprovingError) {
        toast.error(this.props.timeslotsApprovingError.message);
      } else {
        toast.success('Урок підтверджено');
        this.props.onFetchTimeslots();
      }
    }
  }

  render() {
    const {
      props: {
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
        onApproveTimeslots,
      },
    } = this;

    return (
      <React.Fragment>
        <Typography variant="display1" gutterBottom>
          Уроки
        </Typography>
        {timeslotsFetching && <div>Loading</div>}

        {timeslotsFetchingError && <div>{timeslotsFetchingError.message}</div>}

        {!timeslotsFetching && !timeslotsFetchingError && (
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
                    onApprove={onApproveTimeslots}
                    // onDelete={handleDeleteClick}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </React.Fragment>
    );
  }
}

Timeslots.propTypes = {
  onApproveTimeslots: PropTypes.func.isRequired,
  onFetchTimeslots: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  selectTimeslots(),
  selectTimeslotsApproving(),
  selectTimeslotsApprovingError(),
  selectTimeslotsFetching(),
  selectTimeslotsFetchingError(),
  (
    timeslots,
    timeslotsApproving,
    timeslotsApprovingError,
    timeslotsFetching,
    timeslotsFetchingError,
  ) => ({
    timeslots,
    timeslotsApproving,
    timeslotsApprovingError,
    timeslotsFetching,
    timeslotsFetchingError,
  }),
);

const mapDispatchToProps = {
  onApproveTimeslots: approveTimeslots,
  onFetchTimeslots: fetchTimeslots,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeslots);
