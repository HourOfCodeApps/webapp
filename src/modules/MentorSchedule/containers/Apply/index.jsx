import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pick from 'lodash/pick';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { toast } from 'react-toastify';

import { withConfig } from 'modules/Config';
import { withUser } from 'modules/Auth';
import { withSchools } from 'modules/Schools';

import Range from 'shared/components/Range';
import Loading from 'shared/components/Loading';

import LoadingOverlay from '../../components/LoadingOverlay';

import {
  applyTimeslot,
  fetchTimeslots,
  fetchMyTimeslots,
  getUserGeolocation,
} from '../../actions';

import {
  selectTimeslotApplying,
  selectTimeslotApplyingError,
  selectTimeslots,
  selectTimeslotsByDays,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
  selectTimeslotsBySchool,
  selectMyTimeslots,
  selectMyTimeslotsFetching,
  selectMyTimeslotsFetchingError,
  selectUserLocation,
  selectUserLocationFetching,
  selectUserLocationFetchingError,
} from '../../selectors';

import SchoolRow from '../../components/Apply/SchoolRow';

import Map from '../Map';

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

// const dayLabels = days.reduce((acc, curr) => ({
//   ...acc,
//   [curr]: DateTime.fromISO(curr).setLocale('uk').toFormat('EEEE, dd MMMM'),
// }), {});

const todayISO = DateTime.local().toISODate();

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    const { days } = props.config;

    this.state = {
      bounds: null,
      timeRangeValue: [0, 16],
      marks: pick(defaultMarks, [0, 16]),
      selectedDay: todayISO < days[0] ? days[0] : todayISO,
      zoom: 15,
      autoZoomFinished: false,
      selectedSchoolId: null,
    };

    this.handleLoadDayDebounced = debounce(this.handleLoadDay, 300);
  }

  componentDidMount() {
    // this.handleLoadDay();
    // this.props.onFetchTimeslots(this.state.selectedDay);
    this.props.onFetchMyTimeslots();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timeslotApplying && !this.props.timeslotApplying) {
      if (this.props.timeslotApplyingError) {
        toast.error(this.props.timeslotApplyingError.message);
      } else {
        toast.success('Вашу заявку прийнято!');

        this.props.onFetchMyTimeslots();
        this.handleLoadDay();
      }
    }

    if (
      !isEqual(prevState.timeRangeValue, this.state.timeRangeValue)
      || !isEqual(prevState.bounds, this.state.bounds)
    ) {
      this.handleLoadDayDebounced();
    }

    if (prevState.selectedDay !== this.state.selectedDay) {
      this.handleLoadDay();
    }

    if (
      prevProps.timeslotsFetching && !this.props.timeslotsFetching
      && !this.props.timeslotsFetchingError
    ) {
      if (
        !this.state.autoZoomFinished && this.state.zoom > 10
        && Object.keys(this.props.timeslotsBySchool).length < 5
      ) {
        this.setState({ zoom: this.state.zoom - 1 });
      } else {
        this.setState({ autoZoomFinished: true });
      }
    }
  }

  handleLoadDay = () => {
    const { southWest, northEast } = this.state.bounds;
    const range = Object.values(pick(defaultMarks, this.state.timeRangeValue));
    const from = DateTime.fromISO(`${this.state.selectedDay}T${range[0]}`).toJSDate();
    const to = DateTime.fromISO(`${this.state.selectedDay}T${range[1]}`).toJSDate();

    this.props.onFetchTimeslots(from, to, { southWest, northEast });
  }

  handleSelectSchool = (id) => {
    this.setState({ selectedSchoolId: id });
  }

  handleSubmit = (formData) => {
    this.props.onCreateTimeslot({
      ...pick(formData, ['class', 'notes']),
      startTime: formData.startTime.toJSDate(),
      pupilsCount: parseInt(formData.pupilsCount, 10),
    });
  }

  handleApply = (timeslotId) => {
    this.props.onApplyTimeslot(timeslotId);
  }

  handleTimeRangeChange = (value) => {
    this.setState({
      timeRangeValue: value,
      marks: pick(defaultMarks, value),
    });
  }

  handleChangeDay = (ev, day) => {
    this.setState({ selectedDay: day, zoom: 15, autoZoomFinished: false });
  }

  handleMapToggle = () => this.setState(({ isMapShown }) => ({ isMapShown: !isMapShown }));

  handleBoundsChanged = (southWest, northEast) => {
    this.setState({ bounds: { southWest, northEast } });
  }

  render() {
    const {
      handleApply,
      handleBoundsChanged,
      handleTimeRangeChange,
      handleChangeDay,
      state: {
        selectedDay,
        timeRangeValue,
        marks,
        zoom,
        selectedSchoolId,
      },
      props: {
        config,
        schoolsMap,
        timeslotApplying,
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
        timeslotsBySchool,
        myTimeslots,
        myTimeslotsFetching,
        myTimeslotsFetchingError,
      },
    } = this;

    // const daySchools = timeslotsByDays[selectedDay] || {};

    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Typography variant="display1" gutterBottom>
              Вибери школу та урок
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Урок триває 45 хвилин. Рекомендації як провести Годину Коду
              &nbsp;
              <a href="https://docs.google.com/document/d/1AXSIO9AG9KXh-PUdTZa8v-xzWJXhy0SdQPP0Abnz0PU/edit">тут</a>
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
              Обрані уроки
              {!myTimeslotsFetching && !myTimeslotsFetchingError && ` (${myTimeslots.length})`}
            </Button>
          </Grid>
        </Grid>
        <Grid container style={{ marginBottom: 20 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="subheading">
              Знайти школу поблизу
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Range
              min={0}
              max={16}
              value={timeRangeValue}
              marks={marks}
              step={1}
              dots
              defaultValue={[0, 16]}
              allowCross={false}
              onChange={handleTimeRangeChange}
            />
          </Grid>
        </Grid>

        <Map
          onBoundsChanged={handleBoundsChanged}
          timeslots={timeslots}
          schoolIds={Object.keys(timeslotsBySchool)}
          schoolsMap={schoolsMap}
          timeslotsBySchool={timeslotsBySchool}
          zoom={zoom}
          hoveredPin={selectedSchoolId}
          onHover={this.handleSelectSchool}
        />

        <AppBar position="static">
          <Tabs value={selectedDay} onChange={handleChangeDay} fullWidth>
            {config.days.map(day => (
              <Tab
                value={day}
                // label={dayLabels[day]}
                label={day}
                key={day}
                disabled={day < todayISO}
              />
            ))}
          </Tabs>
        </AppBar>

        {timeslotsFetching && (
          <div style={{ height: 150 }}>
            <Loading />
          </div>
        )}

        {timeslotsFetchingError && <div>{timeslotsFetchingError.message}</div>}

        {!timeslotsFetching && !timeslotsFetchingError && (
          <React.Fragment>
            {Object.keys(timeslotsBySchool).map(schoolId => (
              <SchoolRow
                school={schoolsMap[schoolId] || {}}
                timeslots={timeslotsBySchool[schoolId] || []}
                onApply={handleApply}
                onHover={this.handleSelectSchool}
                // isSelected={selectedSchoolId === schoolId}
              />
            ))}

            {!Object.keys(timeslotsBySchool).length && (
              <Typography variant="subheading">
                Уроків на обраній території не знайдено.
              </Typography>
            )}

          </React.Fragment>
        )}

        {timeslotApplying && <LoadingOverlay />}

        {/* {!timeslotsFetching && !timeslotsFetchingError && Object.keys(timeslotsBySchool)
          .map(schoolId => (
            <SchoolRow
              school={schoolsMap[schoolId] || {}}
              timeslots={timeslotsBySchool[schoolId] || []}
              onApply={handleApply}
            />
          ))
        } */}
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  onCreateTimeslot: PropTypes.func.isRequired,
  onDeleteTimeslot: PropTypes.func.isRequired,
  onFetchTimeslots: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.object).isRequired,
  timeslotApplying: PropTypes.bool.isRequired,
  timeslotApplyingError: PropTypes.instanceOf(Object),
  timeslots: PropTypes.instanceOf(Array),
  timeslotsFetching: PropTypes.bool.isRequired,
  timeslotsFetchingError: PropTypes.instanceOf(Object),
};

Schedule.defaultProps = {
  timeslotApplyingError: null,
  timeslots: [],
  timeslotsFetchingError: null,
};

const mapStateToProps = createSelector(
  selectTimeslotApplying(),
  selectTimeslotApplyingError(),
  selectTimeslots(),
  selectTimeslotsByDays(),
  selectTimeslotsFetching(),
  selectTimeslotsFetchingError(),
  selectMyTimeslots(),
  selectMyTimeslotsFetching(),
  selectMyTimeslotsFetchingError(),
  selectTimeslotsBySchool(),
  selectUserLocation(),
  selectUserLocationFetching(),
  selectUserLocationFetchingError(),
  (
    timeslotApplying,
    timeslotApplyingError,
    timeslots,
    timeslotsByDays,
    timeslotsFetching,
    timeslotsFetchingError,
    myTimeslots,
    myTimeslotsFetching,
    myTimeslotsFetchingError,
    timeslotsBySchool,
    userLocation,
    userLocationFetching,
    userLocationFetchingError,
  ) => ({
    timeslotApplying,
    timeslotApplyingError,
    timeslots,
    timeslotsByDays,
    timeslotsFetching,
    timeslotsFetchingError,
    myTimeslots,
    myTimeslotsFetching,
    myTimeslotsFetchingError,
    timeslotsBySchool,
    userLocation,
    userLocationFetching,
    userLocationFetchingError,
  }),
);

const mapDispatchToProps = {
  onApplyTimeslot: applyTimeslot,
  onFetchTimeslots: fetchTimeslots,
  onFetchMyTimeslots: fetchMyTimeslots,
  onGetUserGeolocation: getUserGeolocation,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withConfig,
  withSchools,
  withUser,
)(Schedule);
