import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { withUser } from 'modules/Auth';

import ConfirmationDialog from 'shared/components/ConfirmationDialog';
import Loading from 'shared/components/Loading';

import { withSchools } from 'modules/Schools';

import {
  // createTimeslot,
  cancelTimeslot,
  fetchMyTimeslots,
} from './actions';

import {
  selectMyTimeslots,
  selectMyTimeslotsBySchool,
  selectMyTimeslotsFetching,
  selectMyTimeslotsFetchingError,
  // selectTimeslotCreating,
  // selectTimeslotCreatingError,
  selectTimeslotCanceling,
  selectTimeslotCancelingError,
} from './selectors';

import SchoolRow from './components/SchoolRow';
// import CreateTimeslotForm from './components/CreateTimeslotForm';

class Schedule extends React.Component {
  state = {
    cancelConfirmationDialogShown: false,
    cancelTimeslotId: null,
  };

  componentDidMount() {
    this.props.onFetchMyTimeslots();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timeslotCanceling && !this.props.timeslotCanceling) {
      if (this.props.timeslotCancelingError) {
        toast.error(this.props.timeslotCancelingError.message);
      } else {
        toast.success('Урок успішно відмінено');

        this.props.onFetchMyTimeslots();
      }
      this.handleCancelCancel();
    }
  }

  handleCancelClick = timeslotId => this.setState({
    cancelConfirmationDialogShown: true,
    cancelTimeslotId: timeslotId,
  });

  handleCancelCancel = () => this.setState({
    cancelConfirmationDialogShown: false,
    cancelTimeslotId: null,
  });

  handleCancelTimeslotConfirm = (reason) => {
    const { cancelTimeslotId: timeslotId } = this.state;
    this.props.onCancelTimeslot(timeslotId, reason);
  }

  render() {
    const {
      handleCancelClick,
      handleCancelCancel,
      handleCancelTimeslotConfirm,
      state: {
        cancelConfirmationDialogShown,
      },
      props: {
        schoolsMap,
        myTimeslotsBySchool,
        myTimeslotsFetching,
        myTimeslotsFetchingError,
        timeslotCanceling,
      },
    } = this;

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

        {myTimeslotsFetching && <Loading />}

        {myTimeslotsFetchingError && <div>{myTimeslotsFetchingError.message}</div>}

        {!myTimeslotsFetching && !myTimeslotsFetchingError && Object.keys(myTimeslotsBySchool).map(schoolId => (
          <SchoolRow
            school={(myTimeslotsBySchool[schoolId] && myTimeslotsBySchool[schoolId].school) || {}}
            timeslots={(myTimeslotsBySchool[schoolId] && myTimeslotsBySchool[schoolId].timeslots) || []}
            onCancelTimeslot={handleCancelClick}
          />
        ))}

        {cancelConfirmationDialogShown && (
          <ConfirmationDialog
            onCancel={handleCancelCancel}
            onConfirm={handleCancelTimeslotConfirm}
            confirmLabel="Так"
            cancelLabel="Ні"
            title="Ви впевнені, що хочете відмінити цей урок?"
            loading={timeslotCanceling}
            question="Вкажіть причину"
            danger
          />
        )}
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  // onCreateTimeslot: PropTypes.func.isRequired,
  // onCancelTimeslot: PropTypes.func.isRequired,
  onFetchMyTimeslots: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.object).isRequired,
  timeslotCreating: PropTypes.bool.isRequired,
  timeslotCreatingError: PropTypes.instanceOf(Object),
  timeslotCanceling: PropTypes.bool.isRequired,
  timeslotCancelingError: PropTypes.instanceOf(Object),
  timeslots: PropTypes.instanceOf(Array),
  timeslotsFetching: PropTypes.bool.isRequired,
  timeslotsFetchingError: PropTypes.instanceOf(Object),
};

Schedule.defaultProps = {
  timeslotCreatingError: null,
  timeslotCancelingError: null,
  timeslots: [],
  timeslotsFetchingError: null,
};

const mapStateToProps = createSelector(
  // selectTimeslotCreating(),
  // selectTimeslotCreatingError(),
  selectTimeslotCanceling(),
  selectTimeslotCancelingError(),
  // selectTimeslots(),
  // selectTimeslotsFetching(),
  // selectTimeslotsFetchingError(),
  selectMyTimeslots(),
  selectMyTimeslotsBySchool(),
  selectMyTimeslotsFetching(),
  selectMyTimeslotsFetchingError(),
  (
    // timeslotCreating,
    // timeslotCreatingError,
    timeslotCanceling,
    timeslotCancelingError,
    myTimeslots,
    myTimeslotsBySchool,
    myTimeslotsFetching,
    myTimeslotsFetchingError,

  ) => ({
    // timeslotCreating,
    // timeslotCreatingError,
    timeslotCanceling,
    timeslotCancelingError,
    myTimeslots,
    myTimeslotsBySchool,
    myTimeslotsFetching,
    myTimeslotsFetchingError,
  }),
);

const mapDispatchToProps = {
  // onCreateTimeslot: createTimeslot,
  onCancelTimeslot: cancelTimeslot,
  onFetchMyTimeslots: fetchMyTimeslots,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
  withSchools,
)(Schedule);
