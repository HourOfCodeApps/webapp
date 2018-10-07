import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
import { toast } from 'react-toastify';

import Map, { Marker } from 'shared/components/Map';
import ConfirmationDialog from 'shared/components/ConfirmationDialog';

import {
  deleteSchool,
  fetchSchool,
} from '../../actions';

import {
  selectSchool,
  selectSchoolDeleting,
  selectSchoolDeletingError,
  selectSchoolFetching,
  selectSchoolFetchingError,
} from '../../selectors';

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
    school: PropTypes.instanceOf(Array),
    schoolDeleting: PropTypes.bool.isRequired,
    schoolDeletingError: PropTypes.instanceOf(Object),
    schoolFetching: PropTypes.bool.isRequired,
    schoolFetchingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    school: null,
    schoolDeletingError: null,
    schoolFetchingError: null,
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
      },
    } = this;

    if (schoolFetchingError) {
      return <div>{schoolFetchingError.message}</div>;
    }

    if (!school || schoolFetching) {
      return <div>Loading</div>;
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
  (
    school, schoolDeleting, schoolDeletingError, schoolFetching, schoolFetchingError,
  ) => ({
    school, schoolDeleting, schoolDeletingError, schoolFetching, schoolFetchingError,
  }),
);

const mapDispatchToProps = {
  onDeleteSchool: deleteSchool,
  onFetchSchool: fetchSchool,
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
