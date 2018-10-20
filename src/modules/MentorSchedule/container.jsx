import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { toast } from 'react-toastify';

import { withUser } from 'modules/Auth';

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
    // const { teacher } = this.props.user;
    // this.props.onFetchTimeslots(teacher.schoolId);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.timeslotCreating && !this.props.timeslotCreating) {
    //   if (this.props.timeslotCreatingError) {
    //     toast.error(this.props.timeslotCreatingError.message);
    //   } else {
    //     toast.success('Урок успішно створено');

    //     const { teacher } = this.props.user;
    //     this.props.onFetchTimeslots(teacher.schoolId);
    //   }
    // }

    // if (prevProps.timeslotDeleting && !this.props.timeslotDeleting) {
    //   if (this.props.timeslotDeletingError) {
    //     toast.error(this.props.timeslotDeletingError.message);
    //   } else {
    //     toast.success('Урок успішно виделано');

    //     const { teacher } = this.props.user;
    //     this.props.onFetchTimeslots(teacher.schoolId);
    //   }
    //   this.handleDeleteCancel();
    // }
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
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
      },
    } = this;

    if (timeslotsFetching) {
      return <div>Loading</div>;
    }

    if (timeslotsFetchingError) {
      return <div>{timeslotsFetchingError.message}</div>;
    }

    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography variant="display1" gutterBottom>
              Обрані уроки
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Урок триває 45 хвилин, якщо ти раптом забув. Рекомендації як провести Годину Коду тут
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              color="primary"
              fullWidth
              margin="normal"
              variant="contained"
              size="large"
              component={props => <Link to="/apply" {...props} />}
            >
              Мало тобі? – Візьми ще
            </Button>
          </Grid>
        </Grid>

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
              <TableRow>
                <TableCell component="th" scope="row">8:30</TableCell>
                <TableCell>8В</TableCell>
                <TableCell>15</TableCell>
                <TableCell>Дупа тобі, ментор</TableCell>
                <TableCell>Підтверджено</TableCell>
                <TableCell>Відмінити</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">8:30</TableCell>
                <TableCell>10А</TableCell>
                <TableCell>15</TableCell>
                <TableCell>{''}</TableCell>
                <TableCell>Очікує підтвердження</TableCell>
                <TableCell>Відмінити</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* <Timeslots
          timeslots={timeslots}
          onDeleteTimeslot={handleDeleteClick}
        />
        <CreateTimeslotForm onSubmit={handleSubmit} /> */}
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
};

Schedule.defaultProps = {
  timeslotCreatingError: null,
  timeslotDeletingError: null,
  timeslots: [],
  timeslotsFetchingError: null,
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
)(Schedule);
