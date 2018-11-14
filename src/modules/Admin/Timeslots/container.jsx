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
      handleSubmit,
      handleChangeDay,
      state: {
        deleteConfirmationDialogShown,
      },
      props: {
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
        onApproveTimeslots,
        onDeleteTimeslots,
        schoolsMap: schools,
        timeslotDeleting,
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
  selectTimeslotDeleting(),
  selectTimeslotDeletingError(),
  (
    timeslots,
    timeslotsApproving,
    timeslotsApprovingError,
    timeslotsFetching,
    timeslotsFetchingError,
    timeslotDeleting,
    timeslotDeletingError,
  ) => ({
    timeslots,
    timeslotsApproving,
    timeslotsApprovingError,
    timeslotsFetching,
    timeslotsFetchingError,
    timeslotDeleting,
    timeslotDeletingError,
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
