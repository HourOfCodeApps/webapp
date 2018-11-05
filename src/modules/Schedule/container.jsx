import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { DateTime } from 'luxon';

import { toast } from 'react-toastify';

import { withUser } from 'modules/Auth';
import { withSchools } from 'modules/Schools';

import ConfirmationDialog from 'shared/components/ConfirmationDialog';
import Loading from 'shared/components/Loading';

import {
  createTimeslot,
  deleteTimeslot,
  fetchTimeslots,
} from './actions';

import {
  selectTimeslotCreating,
  selectTimeslotCreatingError,
  selectTimeslotDeleting,
  selectTimeslotDeletingError,
  selectTimeslots,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
} from './selectors';

import Timeslots from './components/Timeslots';
import CreateTimeslotForm from './components/CreateTimeslotForm';

const defaultMarks = {
  0: '08:00',
  1: '08:30',
  2: '09:00',
  3: '09:30',
  4: '10:00',
  5: '10:30',
  6: '11:00',
  7: '11:30',
  8: '12:00',
  9: '12:30',
  10: '13:00',
  11: '13:30',
  12: '14:00',
  13: '14:30',
  14: '15:00',
  15: '15:30',
  16: '16:00',
};

const days = [
  '2018-12-03',
  '2018-12-04',
  '2018-12-05',
  '2018-12-06',
  '2018-12-07',
  '2018-12-08',
];


class Schedule extends React.Component {
  state = {
    deleteConfirmationDialogShown: false,
    deleteTimeslotId: null,
    selectedDay: days[0],
  };

  componentDidMount() {
    const { teacher } = this.props.user;
    this.props.onFetchTimeslots(teacher.schoolId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timeslotCreating && !this.props.timeslotCreating) {
      if (this.props.timeslotCreatingError) {
        toast.error(this.props.timeslotCreatingError.message);
      } else {
        toast.success('Урок успішно створено');

        this.handleLoadDay();
      }
    }

    if (prevProps.timeslotDeleting && !this.props.timeslotDeleting) {
      if (this.props.timeslotDeletingError) {
        toast.error(this.props.timeslotDeletingError.message);
      } else {
        toast.success('Урок успішно видалено');

        this.handleLoadDay();
      }
      this.handleDeleteCancel();
    }

    if (prevState.selectedDay !== this.state.selectedDay) {
      this.handleLoadDay();
    }
  }

  handleLoadDay = () => {
    const { teacher } = this.props.user;
    const from = DateTime.fromISO(`${this.state.selectedDay}T00:00:00`).toJSDate();
    const to = DateTime.fromISO(`${this.state.selectedDay}T23:59:59`).toJSDate();

    this.props.onFetchTimeslots(teacher.schoolId, from, to);
  }

  handleSubmit = (formData) => {
    const startTime = DateTime.fromISO(`${this.state.selectedDay}T${formData.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}`).toJSDate();
    this.props.onCreateTimeslot({
      ...pick(formData, ['class', 'notes']),
      startTime,
      pupilsCount: parseInt(formData.pupilsCount, 10),
    });
  }

  handleDeleteClick = timeslotId => this.setState({
    deleteConfirmationDialogShown: true,
    deleteTimeslotId: timeslotId,
  });

  handleDeleteCancel = () => this.setState({
    deleteConfirmationDialogShown: false,
    deleteTimeslotId: null,
  });

  handleDeleteTimeslotConfirm = () => {
    const { deleteTimeslotId: timeslotId } = this.state;
    this.props.onDeleteTimeslot(timeslotId);
  }

  handleChangeDay = (ev, day) => {
    this.setState({ selectedDay: day });
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
        selectedDay,
      },
      props: {
        schoolsMap,
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
        user,
      },
    } = this;

    const school = schoolsMap[user.teacher.schoolId] || {};

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>{school.name}</Typography>
        <Typography variant="body2" gutterBottom>
          Створи уроки, ментори долучаться. Адміністратор Години Коду підтверджує всі уроки та заявки менторів, статус у відповідній колонці.
        </Typography>

        <Paper>
          <AppBar position="static">
            <Tabs value={selectedDay} onChange={handleChangeDay} fullWidth>
              {days.map(day => (
                <Tab
                  value={day}
                  // label={`${day} (${(timeslotsByDays[day] || []).length})`}
                  label={day}
                  key={day}
                />
              ))}
            </Tabs>
          </AppBar>

          {timeslotsFetching && <Loading />}

          {timeslotsFetchingError && <div>{timeslotsFetchingError.message}</div>}

          {!timeslotsFetching && !timeslotsFetchingError && (
            <Timeslots
              timeslots={timeslots}
              onDeleteTimeslot={handleDeleteClick}
            />
          )}
        </Paper>
        <CreateTimeslotForm onSubmit={handleSubmit} />
        {deleteConfirmationDialogShown && (
          <ConfirmationDialog
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteTimeslotConfirm}
            confirmLabel="Так"
            cancelLabel="Ні"
            title="Ви впевнені, що хочете видалити цей урок?"
          />
        )}
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  onCreateTimeslot: PropTypes.func.isRequired,
  onDeleteTimeslot: PropTypes.func.isRequired,
  onFetchTimeslots: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.object).isRequired,
  timeslotCreating: PropTypes.bool.isRequired,
  timeslotCreatingError: PropTypes.instanceOf(Object),
  timeslotDeleting: PropTypes.bool.isRequired,
  timeslotDeletingError: PropTypes.instanceOf(Object),
  timeslots: PropTypes.instanceOf(Array),
  timeslotsFetching: PropTypes.bool.isRequired,
  timeslotsFetchingError: PropTypes.instanceOf(Object),
  schoolsMap: PropTypes.instanceOf(Object),
};

Schedule.defaultProps = {
  timeslotCreatingError: null,
  timeslotDeletingError: null,
  timeslots: [],
  timeslotsFetchingError: null,
  schoolsMap: {},
};

const mapStateToProps = createSelector(
  selectTimeslotCreating(),
  selectTimeslotCreatingError(),
  selectTimeslotDeleting(),
  selectTimeslotDeletingError(),
  selectTimeslots(),
  selectTimeslotsFetching(),
  selectTimeslotsFetchingError(),
  (
    timeslotCreating,
    timeslotCreatingError,
    timeslotDeleting,
    timeslotDeletingError,
    timeslots,
    timeslotsFetching,
    timeslotsFetchingError,
  ) => ({
    timeslotCreating,
    timeslotCreatingError,
    timeslotDeleting,
    timeslotDeletingError,
    timeslots,
    timeslotsFetching,
    timeslotsFetchingError,
  }),
);

const mapDispatchToProps = {
  onCreateTimeslot: createTimeslot,
  onDeleteTimeslot: deleteTimeslot,
  onFetchTimeslots: fetchTimeslots,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
  withSchools,
)(Schedule);
