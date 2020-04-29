import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
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
import Grid from '@material-ui/core/Grid';

import { withSchools } from 'modules/Schools';
import ConfirmationDialog from 'shared/components/ConfirmationDialog';
import Loading from 'shared/components/Loading';
import {
  approveTimeslots,
  deleteTimeslot,
  fetchTimeslots,
} from './actions';

import {
  selectTimeslots,
  selectTimeslotsApproving,
  selectTimeslotsApprovingError,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
  selectTimeslotDeleting,
  selectTimeslotDeletingError,
  selectTimeslotsWaitForApproveCount,
  selectTimeslotsWaitForMentorCount,
  selectTimeslotsMentorWaitsForApproveCount,
  selectTimeslotsHaveMentorCount,
} from './selectors';

import TimeslotRow from './components/TimeslotRow';

class Timeslots extends React.Component {
  state = {
    deleteConfirmationDialogShown: false,
    deleteTimeslotId: null,
  };

  componentDidMount() {
    this.props.onFetchTimeslots();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timeslotsApproving && !this.props.timeslotsApproving) {
      if (this.props.timeslotsApprovingError) {
        toast.error(this.props.timeslotsApprovingError.message);
      } else {
        toast.success('Урок підтверджено');
      }
      this.props.onFetchTimeslots();
    }

    if (prevProps.timeslotDeleting && !this.props.timeslotDeleting) {
      if (this.props.timeslotDeletingError) {
        toast.error(this.props.timeslotDeletingError.message);
      } else {
        toast.success('Урок успішно видалено');
      }
      this.props.onFetchTimeslots();
      this.handleDeleteCancel();
    }
  }

  handleDeleteClick = timeslotId => this.setState({
    deleteConfirmationDialogShown: true,
    deleteTimeslotId: timeslotId,
  });

  handleDeleteCancel = () => this.setState({
    deleteConfirmationDialogShown: false,
    deleteTimeslotId: null,
  });

  handleDeleteTimeslotConfirm = (reason) => {
    const { deleteTimeslotId } = this.state;
    this.props.onDeleteTimeslot(deleteTimeslotId, reason);
  }

  render() {
    const {
      handleDeleteClick,
      handleDeleteCancel,
      handleDeleteTimeslotConfirm,
      state: {
        deleteConfirmationDialogShown,
      },
      props: {
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
        onApproveTimeslots,
        schoolsMap: schools,
        timeslotDeleting,
        timeslotsWaitForApproveCount,
        timeslotsWaitForMentorCount,
        timeslotsMentorWaitsForApproveCount,
        timeslotsHaveMentorCount,
      },
    } = this;

    return (
      <>
        <Grid container justify="space-between" alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <Typography variant="display1" gutterBottom>
              Уроки
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subheading" align="right">
              Кількість уроків:&nbsp;
              {timeslots.length}
            </Typography>
            <Typography variant="subheading" align="right">
              Очікує підтвердження:&nbsp;
              {timeslotsWaitForApproveCount}
              ,&nbsp;Очікує ментора:&nbsp;
              {timeslotsWaitForMentorCount}
            </Typography>
            <Typography variant="subheading" align="right">
              Ментор очікує підтвердження:&nbsp;
              {timeslotsMentorWaitsForApproveCount}
              ,&nbsp;Має ментора:&nbsp;
              {timeslotsHaveMentorCount}
            </Typography>
          </Grid>
        </Grid>

        {timeslotsFetching && <Loading />}

        {timeslotsFetchingError && <div>{timeslotsFetchingError.message}</div>}

        {!timeslotsFetching && !timeslotsFetchingError && (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Час початку</TableCell>
                  <TableCell>Школа</TableCell>
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
                    // onDelete={onDeleteTimeslots}
                    onDelete={handleDeleteClick}
                    school={schools[t.schoolId] || {}}
                    // onDelete={handleDeleteClick}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
        {deleteConfirmationDialogShown && (
          <ConfirmationDialog
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteTimeslotConfirm}
            confirmLabel="Так"
            cancelLabel="Ні"
            title="Ви впевнені, що хочете видалити цей урок?"
            loading={timeslotDeleting}
            question="Вкажіть причину"
            danger
          />
        )}
      </>
    );
  }
}

Timeslots.propTypes = {
  timeslotsApproving: PropTypes.bool.isRequired,
  timeslotsApprovingError: PropTypes.shape({
    message: PropTypes.string,
  }),
  timeslotDeletingError: PropTypes.shape({
    message: PropTypes.string,
  }),
  timeslotsFetchingError: PropTypes.shape({
    message: PropTypes.string,
  }),
  timeslotDeleting: PropTypes.bool.isRequired,
  timeslotsFetching: PropTypes.bool.isRequired,
  onApproveTimeslots: PropTypes.func.isRequired,
  onFetchTimeslots: PropTypes.func.isRequired,
  onDeleteTimeslot: PropTypes.func.isRequired,
  timeslotsWaitForApproveCount: PropTypes.number.isRequired,
  timeslotsWaitForMentorCount: PropTypes.number.isRequired,
  timeslotsMentorWaitsForApproveCount: PropTypes.number.isRequired,
  timeslotsHaveMentorCount: PropTypes.number.isRequired,
  timeslots: PropTypes.instanceOf(Array),
  schoolsMap: PropTypes.instanceOf(Object).isRequired,
};

Timeslots.defaultProps = {
  timeslotsApprovingError: null,
  timeslotDeletingError: null,
  timeslotsFetchingError: null,
  timeslots: [],
};

const mapStateToProps = createSelector(
  selectTimeslots(),
  selectTimeslotsApproving(),
  selectTimeslotsApprovingError(),
  selectTimeslotsFetching(),
  selectTimeslotsFetchingError(),
  selectTimeslotDeleting(),
  selectTimeslotDeletingError(),
  selectTimeslotsWaitForApproveCount(),
  selectTimeslotsWaitForMentorCount(),
  selectTimeslotsMentorWaitsForApproveCount(),
  selectTimeslotsHaveMentorCount(),
  (
    timeslots,
    timeslotsApproving,
    timeslotsApprovingError,
    timeslotsFetching,
    timeslotsFetchingError,
    timeslotDeleting,
    timeslotDeletingError,
    timeslotsWaitForApproveCount,
    timeslotsWaitForMentorCount,
    timeslotsMentorWaitsForApproveCount,
    timeslotsHaveMentorCount,
  ) => ({
    timeslots,
    timeslotsApproving,
    timeslotsApprovingError,
    timeslotsFetching,
    timeslotsFetchingError,
    timeslotDeleting,
    timeslotDeletingError,
    timeslotsWaitForApproveCount,
    timeslotsWaitForMentorCount,
    timeslotsMentorWaitsForApproveCount,
    timeslotsHaveMentorCount,
  }),
);

const mapDispatchToProps = {
  onApproveTimeslots: approveTimeslots,
  onDeleteTimeslot: deleteTimeslot,
  onFetchTimeslots: fetchTimeslots,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSchools,
)(Timeslots);
