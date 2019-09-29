import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

import Map, { Marker } from 'shared/components/Map';
import ConfirmationDialog from 'shared/components/ConfirmationDialog';

import isEqual from 'lodash/isEqual';

import { IconButton } from 'shared/components/Buttons';
import Loading from 'shared/components/Loading/index';
import Paper from 'shared/components/Paper';
import {
  deleteSchool,
  fetchSchool,
  fetchSchoolTimeslots,
} from '../../actions';

import {
  selectSchool,
  selectSchoolDeleting,
  selectSchoolDeletingError,
  selectSchoolFetching,
  selectSchoolFetchingError,
  selectSchoolTimeslots,
  selectSchoolTimeslotsFetching,
  selectSchoolTimeslotsFetchingError,
} from '../../selectors';
import Timeslots from '../../components/Timeslots/index';


class School extends React.Component {
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
    onDeleteSchool: PropTypes.func.isRequired,
    onFetchSchool: PropTypes.func.isRequired,
    onFetchSchoolTimeslots: PropTypes.func.isRequired,
    school: PropTypes.instanceOf(Object),
    schoolDeleting: PropTypes.bool.isRequired,
    schoolDeletingError: PropTypes.instanceOf(Object),
    schoolFetching: PropTypes.bool.isRequired,
    schoolFetchingError: PropTypes.instanceOf(Object),
    timeslots: PropTypes.instanceOf(Array),
    timeslotsFetching: PropTypes.bool.isRequired,
    timeslotsFetchingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    school: null,
    schoolDeletingError: null,
    schoolFetchingError: null,
    timeslots: [],
    timeslotsFetchingError: null,
  }

  state = {
    deleteConfirmationDialogShown: false,
  };

  componentDidMount() {
    const { match: { params: { id } }, onFetchSchool } = this.props;
    onFetchSchool(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schoolDeleting && !this.props.schoolDeleting) {
      if (this.props.schoolDeletingError) {
        toast.error(this.props.schoolDeletingError.message);
      } else {
        toast.success('Школу успішно видалено');
        this.props.history.push('/schools');
      }
      this.handleDeleteCancel();
    }

    if (!isEqual(prevProps.school, this.props.school) && this.props.school) {
      this.props.onFetchSchoolTimeslots(this.props.school.id);
    }
  }

  handleDeleteClick = () => this.setState({
    deleteConfirmationDialogShown: true,
  });

  handleDeleteCancel = () => this.setState({
    deleteConfirmationDialogShown: false,
  });

  handleDeleteSchoolConfirm = () => {
    const { match: { params: { id } }, onDeleteSchool } = this.props;
    onDeleteSchool(id);
  }

  render() {
    const {
      handleDeleteClick,
      handleDeleteCancel,
      handleDeleteSchoolConfirm,
      state: {
        deleteConfirmationDialogShown,
      },
      props: {
        school,
        schoolFetching,
        schoolFetchingError,
        timeslots,
        timeslotsFetching,
        timeslotsFetchingError,
      },
    } = this;

    if (schoolFetchingError) {
      return <div>{schoolFetchingError.message}</div>;
    }

    if (!school || schoolFetching) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Paper>
          <Grid container spacing={40}>
            <Grid item xs={12} md={6}>
              <IconButton
                component={Link}
                to={`/school/${school.id}/edit`}
                aria-label="Edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                aria-label="Delete"
              >
                <DeleteIcon />
              </IconButton>
              <Typography variant="title" gutterBottom>
                {school.name}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {school.city}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {school.addressStreet}
                &nbsp;
                {school.addressBuilding}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {school.website}
              </Typography>

              {(school.phones || []).map(phone => (
                <Typography variant="body1" key={phone}>
                  {phone}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ height: 300 }}>
                <Map
                  defaultCenter={{
                    lat: school.latitude,
                    lng: school.longitude,
                  }}
                  defaultZoom={18}
                  options={{
                    disableDefaultUI: true,
                    draggable: false,
                  }}
                >
                  <Marker position={{ lat: school.latitude, lng: school.longitude }} />
                </Map>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <Paper>
          {timeslotsFetching && (<Loading />)}
          {timeslotsFetchingError && (<div>{timeslotsFetchingError.message}</div>)}
          {!timeslotsFetching && !timeslotsFetchingError && (
            <Timeslots timeslots={timeslots} />
          )}
        </Paper>

        {deleteConfirmationDialogShown && (
          <ConfirmationDialog
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteSchoolConfirm}
            confirmLabel="Так"
            cancelLabel="Ні"
            title="Ви впевнені, що хочете видалити цю школу?"
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  selectSchool(),
  selectSchoolDeleting(),
  selectSchoolDeletingError(),
  selectSchoolFetching(),
  selectSchoolFetchingError(),
  selectSchoolTimeslots(),
  selectSchoolTimeslotsFetching(),
  selectSchoolTimeslotsFetchingError(),
  (
    school,
    schoolDeleting,
    schoolDeletingError,
    schoolFetching,
    schoolFetchingError,
    timeslots,
    timeslotsFetching,
    timeslotsFetchingError,
  ) => ({
    school,
    schoolDeleting,
    schoolDeletingError,
    schoolFetching,
    schoolFetchingError,
    timeslots,
    timeslotsFetching,
    timeslotsFetchingError,
  }),
);

const mapDispatchToProps = {
  onDeleteSchool: deleteSchool,
  onFetchSchool: fetchSchool,
  onFetchSchoolTimeslots: fetchSchoolTimeslots,
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
