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
import { DateTime } from 'luxon';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { toast } from 'react-toastify';

import { withUser } from 'modules/Auth';
import { withSchools } from 'modules/Schools';

import ConfirmationDialog from 'shared/components/ConfirmationDialog';
import Range from 'shared/components/Range';


import {
  createTimeslot,
  deleteTimeslot,
  fetchTimeslots,
} from '../../actions';

import {
  selectTimeslotCreating,
  selectTimeslotCreatingError,
  selectTimeslotDeleting,
  selectTimeslotDeletingError,
  selectTimeslots,
  selectTimeslotsByDays,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
} from '../../selectors';

const defaultMarks = {
  0: '8:30',
  1: '9:00',
  2: '9:30',
  3: '10:00',
  4: '10:30',
  5: '11:00',
  6: '11:30',
  7: '12:00',
  8: '12:30',
  9: '13:00',
  10: '13:30',
  11: '14:00',
  12: '14:30',
  13: '15:00',
  14: '15:30',
  15: '16:00',
};

const days = [
  '2018-12-03',
  '2018-12-04',
  '2018-12-05',
  '2018-12-06',
  '2018-12-07',
  '2018-12-08',
];

// import Timeslots from './components/Timeslots';
// import CreateTimeslotForm from './components/CreateTimeslotForm';

class Schedule extends React.Component {
  state = {
    deleteConfirmationDialogShown: false,
    deleteTimeslotId: null,
    timeRangeValue: [0, 15],
    marks: pick(defaultMarks, [1, 15]),
    selectedDay: days[0],
  };

  componentDidMount() {
    this.props.onFetchTimeslots();
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

  handleTimeRangeChange = (value) => {
    this.setState({
      timeRangeValue: value,
      marks: pick(defaultMarks, value),
    })
  }

  handleChangeDay = (ev, day) => {
    this.setState({ selectedDay: day });
  }

  render() {
    const {
      handleTimeRangeChange,
      handleChangeDay,
      handleDeleteClick,
      handleDeleteCancel,
      handleDeleteTimeslotConfirm,
      handleSubmit,
      state: {
        selectedDay,
        deleteConfirmationDialogShown,
        timeRangeValue,
        marks,
      },
      props: {
        timeslots,
        timeslotsByDays,
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
          <Grid item xs={12} md={9}>
            <Typography variant="display1" gutterBottom>
              Вибери школу та урок
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Урок триває 45 хвилин, якщо ти раптом забув. Рекомендації як провести Годину Коду тут
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              color="primary"
              fullWidth
              margin="normal"
              variant="contained"
              size="large"
              component={props => <Link to="/" {...props} />}
            >
              Обрані уроки (0)
            </Button>
          </Grid>
        </Grid>
        <Grid container style={{ marginBottom: 20 }}>
          <Grid item xs={12} md={8}>
            Знайти школу поблизу
          </Grid>
          <Grid item xs={12} md={4}>
            <Range
              min={0}
              max={15}
              value={timeRangeValue}
              marks={marks}
              step={1}
              dots
              defaultValue={[0, 15]}
              allowCross={false}
              onChange={handleTimeRangeChange}
            />
          </Grid>
        </Grid>

        <Tabs value={selectedDay} onChange={handleChangeDay} fullWidth>
          {days.map(day => (
            <Tab value={day} label={`${day} (${(timeslotsByDays[day] || []).length})`} key={day} />
          ))}
        </Tabs>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Час початку</TableCell>
                <TableCell>Клас</TableCell>
                <TableCell>Кількість учнів</TableCell>
                <TableCell>Коментар</TableCell>
                <TableCell>Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(timeslotsByDays[selectedDay] || []).map(timeslot => (
                <TableRow key={timeslot.id}>
                  <TableCell component="th" scope="row">{DateTime.fromJSDate(timeslot.startTime).toFormat('HH:mm')}</TableCell>
                  <TableCell>{timeslot.class}</TableCell>
                  <TableCell>{timeslot.pupilsCount}</TableCell>
                  <TableCell>{timeslot.notes}</TableCell>
                  <TableCell>Я прийду на урок</TableCell>
                </TableRow>
              ))}
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
  selectTimeslotsByDays(),
  selectTimeslotsFetching(),
  selectTimeslotsFetchingError(),
  (
    timeslotCreating,
    timeslotCreatingError,
    timeslotDeleting,
    timeslotDeletingError,
    timeslots,
    timeslotsByDays,
    timeslotsFetching,
    timeslotsFetchingError,
  ) => ({
    timeslotCreating,
    timeslotCreatingError,
    timeslotDeleting,
    timeslotDeletingError,
    timeslots,
    timeslotsByDays,
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
  withSchools,
  withUser,
)(Schedule);
