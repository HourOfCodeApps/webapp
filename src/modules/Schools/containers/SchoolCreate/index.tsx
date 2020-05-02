import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import pick from 'lodash/pick';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';

import Container from 'shared/components/Container';


import {
  createSchool,
} from '../../actions';

import {
  selectSchool,
  selectSchoolCreating,
  selectSchoolCreatingError,
} from '../../selectors';
import SchoolForm from '../../components/SchoolForm';

type SchoolCreateProps = {
  onCreateSchool: (data: Object) => void;
  school: Object | null,
  schoolCreating: boolean;
  schoolCreatingError: Error | null;
  history: {
    push: (url: string) => void;
  };
  match: {
    params: { id: string; };
  };
};

class School extends React.Component<SchoolCreateProps> {
  componentDidUpdate(prevProps: SchoolCreateProps) {
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

  handleSubmit = (formData: Object) => {
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
      <Container>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SchoolForm
                  onSubmit={handleSubmit}
                  disabled={schoolCreating}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
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
