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
import red from '@material-ui/core/colors/red';

import { toast } from 'react-toastify';

import { withConfig } from 'modules/Config';
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
  selectTimeslotsByDays,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
} from './selectors';

import Timeslots from './components/Timeslots';
import CreateTimeslotForm from './components/CreateTimeslotForm';

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteConfirmationDialogShown: false,
      deleteTimeslotId: null,
      selectedDay: props.config.days[0],
    };
  }

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
    const startTime = DateTime.fromISO(`${this.state.selectedDay}T${formData.startTime.toFormat('HH:mm')}`).toJSDate();
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

  handleDeleteTimeslotConfirm = (reason) => {
    const { deleteTimeslotId: timeslotId } = this.state;
    this.props.onDeleteTimeslot(timeslotId, reason);
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
        config,
        schoolsMap,
        timeslotCreating,
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
        timeslotDeleting,
        user,
      },
    } = this;

    const school = schoolsMap[user.teacher.schoolId] || {};

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>{school.name}</Typography>
        <Typography variant="body2" gutterBottom>
          Створи уроки, ментори долучаться.
          Адміністратор Години Коду підтверджує всі уроки
          та заявки менторів, статус у відповідній колонці.
        </Typography>

        <Paper>
          <AppBar position="static">
            <Tabs value={selectedDay} onChange={handleChangeDay} fullWidth>
              {config.days.map(day => (
                <Tab
                  value={day}
                  label={`${day} (${(timeslots[day] || []).length})`}
                  // label={day}
                  key={day}
                />
              ))}
            </Tabs>
          </AppBar>

          {timeslotsFetching && <Loading />}

          {timeslotsFetchingError && <div>{timeslotsFetchingError.message}</div>}

          {!timeslotsFetching && !timeslotsFetchingError && (
            <Timeslots
              timeslots={timeslots[selectedDay] || []}
              onDeleteTimeslot={handleDeleteClick}
            />
          )}
        </Paper>
        {config.timeslotCreationEnabled && !timeslotsFetching && !timeslotsFetchingError && (
          <CreateTimeslotForm onSubmit={handleSubmit} timeslotCreating={timeslotCreating} />
        )}
        {!config.timeslotCreationEnabled && (
          <Paper
            style={{
              marginTop: 20,
              padding: 20,
            }}
          >
            <Typography variant="title" align="center" style={{ color: red[500] }}>
              Час реєстрації нових уроків вичерпано. До зустрічі наступного року.
            </Typography>
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

Schedule.propTypes = {
  config: PropTypes.shape({
    days: PropTypes.array.isRequired,
  }).isRequired,
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
  selectTimeslotsByDays(),
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
  withConfig,
  withUser,
  withSchools,
)(Schedule);
