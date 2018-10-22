import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';
import Typography from '@material-ui/core/Typography';

import { toast } from 'react-toastify';

import { withUser } from 'modules/Auth';
import { withSchools } from 'modules/Schools';

import ConfirmationDialog from 'shared/components/ConfirmationDialog';

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

class Schedule extends React.Component {
  state = {
    deleteConfirmationDialogShown: false,
    deleteTimeslotId: null,
  };

  componentDidMount() {
    const { teacher } = this.props.user;
    this.props.onFetchTimeslots(teacher.schoolId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timeslotCreating && !this.props.timeslotCreating) {
      if (this.props.timeslotCreatingError) {
        toast.error(this.props.timeslotCreatingError.message);
      } else {
        toast.success('Урок успішно створено');

        const { teacher } = this.props.user;
        this.props.onFetchTimeslots(teacher.schoolId);
      }
    }

    if (prevProps.timeslotDeleting && !this.props.timeslotDeleting) {
      if (this.props.timeslotDeletingError) {
        toast.error(this.props.timeslotDeletingError.message);
      } else {
        toast.success('Урок успішно видалено');

        const { teacher } = this.props.user;
        this.props.onFetchTimeslots(teacher.schoolId);
      }
      this.handleDeleteCancel();
    }
  }

  handleSubmit = (formData) => {
    this.props.onCreateTimeslot({
      ...pick(formData, ['class', 'notes']),
      startTime: formData.startTime.toJSDate(),
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

  render() {
    const {
      handleDeleteClick,
      handleDeleteCancel,
      handleDeleteTimeslotConfirm,
      handleSubmit,
      state: {
        deleteConfirmationDialogShown,
      },
      props: {
        schoolsMap,
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
        user,
      },
    } = this;

    if (timeslotsFetching) {
      return <div>Loading</div>;
    }

    if (timeslotsFetchingError) {
      return <div>{timeslotsFetchingError.message}</div>;
    }

    const school = schoolsMap[user.teacher.schoolId] || {};

    return (
      <React.Fragment>

        <Typography variant="title" gutterBottom>{school.name}</Typography>
        <Typography variant="body2" gutterBottom>
          Створи уроки, ментори долучаться. Адміністратор Години Коду підтверджує всі уроки та заявки менторів, статус у відповідній колонці.
        </Typography>
        <Timeslots
          timeslots={timeslots}
          onDeleteTimeslot={handleDeleteClick}
        />
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
