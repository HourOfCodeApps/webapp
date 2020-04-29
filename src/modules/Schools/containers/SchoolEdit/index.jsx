import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import isEqual from 'lodash/isEqual';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
import { toast } from 'react-toastify';

import Map, { Marker } from 'shared/components/Map';
import ConfirmationDialog from 'shared/components/ConfirmationDialog';
import Loading from 'shared/components/Loading';

import {
  deleteSchool,
  fetchSchool,
  updateSchool,
} from '../../actions';

import {
  selectSchool,
  selectSchoolDeleting,
  selectSchoolDeletingError,
  selectSchoolFetching,
  selectSchoolFetchingError,
  selectSchoolUpdating,
  selectSchoolUpdatingError,
} from '../../selectors';
import SchoolForm from '../../components/SchoolForm';

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
      params: {
        id: PropTypes.string.isRequired,
      },
    }).isRequired,
    onDeleteSchool: PropTypes.func.isRequired,
    onFetchSchool: PropTypes.func.isRequired,
    onUpdateSchool: PropTypes.func.isRequired,
    school: PropTypes.instanceOf(Array),
    schoolDeleting: PropTypes.bool.isRequired,
    schoolDeletingError: PropTypes.instanceOf(Object),
    schoolFetching: PropTypes.bool.isRequired,
    schoolFetchingError: PropTypes.instanceOf(Object),
    schoolUpdating: PropTypes.bool.isRequired,
    schoolUpdatingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    school: null,
    schoolDeletingError: null,
    schoolFetchingError: null,
    schoolUpdatingError: null,
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

    if (prevProps.schoolUpdating && !this.props.schoolUpdating) {
      if (this.props.schoolUpdatingError) {
        toast.error(this.props.schoolUpdatingError.message);
      } else {
        toast.success('Школу успішно оновлено');
      }
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

  handleSubmit = (formData) => {
    const { onUpdateSchool, school } = this.props;

    const normalizedFormData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    const data = pickBy(
      pick(normalizedFormData, [
        'addressBuilding', 'addressStreet', 'city', 'cityDistrict', 'latitude', 'longitude', 'name', 'phones', 'subjectOfManagement', 'website',
      ]),
      (value, key) => !isEqual(school[key], value),
    );

    onUpdateSchool(school.id, data);
  }

  render() {
    const {
      handleDeleteClick,
      handleDeleteCancel,
      handleDeleteSchoolConfirm,
      handleSubmit,
      state: {
        deleteConfirmationDialogShown,
      },
      props: {
        school,
        schoolFetching,
        schoolFetchingError,
        schoolUpdating,
      },
    } = this;

    if (schoolFetchingError) {
      return <div>{schoolFetchingError.message}</div>;
    }

    if (!school || schoolFetching) {
      return <Loading />;
    }

    return (
      <>
        <Paper>
          <Grid container spacing={40}>
            <Grid item xs={12} md={6}>
              <IconButton
                component={Link}
                to={`/school/${school.id}`}
                aria-label="View"
              >
                <ViewIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                aria-label="Delete"
              >
                <DeleteIcon />
              </IconButton>
              <SchoolForm
                initialValues={school}
                onSubmit={handleSubmit}
                disabled={schoolUpdating}
              />
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
      </>
    );
  }
}

const mapStateToProps = createSelector(
  selectSchool(),
  selectSchoolDeleting(),
  selectSchoolDeletingError(),
  selectSchoolFetching(),
  selectSchoolFetchingError(),
  selectSchoolUpdating(),
  selectSchoolUpdatingError(),
  (
    school, schoolDeleting, schoolDeletingError,
    schoolFetching, schoolFetchingError, schoolUpdating, schoolUpdatingError,
  ) => ({
    school,
    schoolDeleting,
    schoolDeletingError,
    schoolFetching,
    schoolFetchingError,
    schoolUpdating,
    schoolUpdatingError,
  }),
);

const mapDispatchToProps = {
  onDeleteSchool: deleteSchool,
  onFetchSchool: fetchSchool,
  onUpdateSchool: updateSchool,
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
