import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import pick from 'lodash/pick';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';


import {
  createSchool,
} from '../../actions';

import {
  selectSchool,
  selectSchoolCreating,
  selectSchoolCreatingError,
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
    onCreateSchool: PropTypes.func.isRequired,
    school: PropTypes.instanceOf(Array),
    schoolCreating: PropTypes.bool.isRequired,
    schoolCreatingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    school: null,
    schoolCreatingError: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schoolCreating && !this.props.schoolCreating) {
      if (this.props.schoolCreatingError) {
        toast.error(this.props.schoolCreatingError.message);
      } else {
        toast.success('Школу успішно створено');
        this.props.history.push(`/school/${this.props.school.id}`);
      }
    }
  }

  isNew = () => !this.props.match.params.id;

  handleSubmit = (formData) => {
    const { onCreateSchool } = this.props;

    const normalizedFormData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    const data = pick(normalizedFormData, [
      'addressBuilding', 'addressStreet', 'city', 'cityDistrict', 'latitude', 'longitude', 'name', 'phones', 'subjectOfManagement', 'website',
    ]);

    onCreateSchool(data);
  }

  render() {
    const {
      handleSubmit,
      props: {
        schoolCreating,
      },
    } = this;

    return (
      <>
        <Paper>
          <Grid container spacing={40}>
            <Grid item xs={12} md={6}>
              <SchoolForm
                onSubmit={handleSubmit}
                disabled={schoolCreating}
              />
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

const mapStateToProps = createSelector(
  selectSchool(),
  selectSchoolCreating(),
  selectSchoolCreatingError(),
  (
    school, schoolCreating, schoolCreatingError,
  ) => ({
    school, schoolCreating, schoolCreatingError,
  }),
);

const mapDispatchToProps = {
  onCreateSchool: createSchool,
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
