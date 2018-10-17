import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';

import { toast } from 'react-toastify';

import { withUser } from 'modules/Auth';

import {
  createTimeslot,
  fetchTimeslots,
} from './actions';

import {
  selectTimeslots,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
} from './selectors';

import Timeslots from './components/Timeslots';
import CreateTimeslotForm from './components/CreateTimeslotForm';

class Schedule extends React.Component {
  componentDidMount() {
    const { teacher } = this.props.user;
    // console.log(this.props.user);
    this.props.onFetchTimeslots(teacher.schoolId);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.teachersApproving && !this.props.teachersApproving) {
  //     if (this.props.teachersApprovingError) {
  //       toast.error(this.props.teachersApprovingError.message);
  //     } else {
  //       toast.success('Вчителя успішно підтверджено');
  //       this.props.onFetchTeachers();
  //     }
  //   }
  // }

  // handleApproveTeacherClick = (id) => {
  //   this.props.onApproveTeachers(id);
  // }

  handleSubmit = (formData) => {
    this.props.onCreateTimeslot({
      ...pick(formData, ['class', 'notes']),
      startTime: formData.startTime.toJSDate(),
      pupilsCount: parseInt(formData.pupilsCount, 10),
    });
  }

  render() {
    // const { classes } = this.props;

    const {
      // handleApproveTeacherClick,
      // handleDeleteClick,
      // handleDeleteCancel,
      // handleDeleteSchoolConfirm,
      handleSubmit,
      // state: {
      //   deleteConfirmationDialogShown,
      // },
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
        <div>{this.props.user.teacher.schoolId}</div>
        <Timeslots timeslots={timeslots} />
        <CreateTimeslotForm onSubmit={handleSubmit} />
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  onCreateTimeslot: PropTypes.func.isRequired,
  onFetchTimeslots: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.object).isRequired,
};

// export default withStyles(styles)(Teachers);


const mapStateToProps = createSelector(
  selectTimeslots(),
  selectTimeslotsFetching(),
  selectTimeslotsFetchingError(),
  (
    timeslots, timeslotsFetching, timeslotsFetchingError,
  ) => ({
    timeslots, timeslotsFetching, timeslotsFetchingError,
  }),
);

const mapDispatchToProps = {
  onCreateTimeslot: createTimeslot,
  onFetchTimeslots: fetchTimeslots,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
)(Schedule);
