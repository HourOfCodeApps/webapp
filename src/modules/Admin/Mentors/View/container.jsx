import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import isEqual from 'lodash/isEqual';

import Loading from 'shared/components/Loading/index';

import {
  fetchMentor,
  fetchMentorTimeslots,
} from './actions';

import {
  selectMentor,
  selectMentorFetching,
  selectMentorFetchingError,
  selectMentorTimeslots,
  selectMentorTimeslotsFetching,
  selectMentorTimeslotsFetchingError,
} from './selectors';
import Timeslots from './components/Timeslots';

class Mentor extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    onFetchMentor: PropTypes.func.isRequired,
    onFetchTimeslots: PropTypes.func.isRequired,
    mentor: PropTypes.instanceOf(Object),
    mentorFetching: PropTypes.bool.isRequired,
    mentorFetchingError: PropTypes.instanceOf(Object),
    timeslots: PropTypes.instanceOf(Array),
    timeslotsFetching: PropTypes.bool.isRequired,
    timeslotsFetchingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    mentor: null,
    mentorFetchingError: null,
    timeslots: [],
    timeslotsFetchingError: null,
  };

  componentDidMount() {
    const { match: { params: { id } }, onFetchMentor } = this.props;
    onFetchMentor(id);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.mentor, this.props.mentor) && this.props.mentor) {
      this.props.onFetchTimeslots(this.props.mentor.uid);
    }
  }

  render() {
    const {
      props: {
        mentor,
        mentorFetching,
        mentorFetchingError,
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
      },
    } = this;

    if (mentorFetchingError) {
      return <div>{mentorFetchingError.message}</div>;
    }

    if (!mentor || mentorFetching) {
      return <Loading />;
    }

    const { profile } = mentor;

    return (
      <React.Fragment>
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="title" gutterBottom>
                {profile.firstName}
                &nbsp;
                {profile.lastName}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {profile.email}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {profile.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} />
          </Grid>
        </Paper>

        <Paper>
          {timeslotsFetching && (<Loading />)}
          {timeslotsFetchingError && (<div>{timeslotsFetchingError.message}</div>)}
          {!timeslotsFetching && !timeslotsFetchingError && (
            <Timeslots timeslots={timeslots} />
          )}
        </Paper>

      </React.Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  selectMentor(),
  selectMentorFetching(),
  selectMentorFetchingError(),
  selectMentorTimeslots(),
  selectMentorTimeslotsFetching(),
  selectMentorTimeslotsFetchingError(),
  (
    mentor,
    mentorFetching,
    mentorFetchingError,
    timeslots,
    timeslotsFetching,
    timeslotsFetchingError,
  ) => ({
    mentor,
    mentorFetching,
    mentorFetchingError,
    timeslots,
    timeslotsFetching,
    timeslotsFetchingError,
  }),
);

const mapDispatchToProps = {
  onFetchMentor: fetchMentor,
  onFetchTimeslots: fetchMentorTimeslots,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mentor);
