import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Map, { Marker } from 'shared/components/Map';

import {
  fetchSchool,
} from '../../actions';

import {
  selectSchool,
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
    onFetchSchool: PropTypes.func.isRequired,
    school: PropTypes.instanceOf(Array),
    schoolFetching: PropTypes.bool.isRequired,
    schoolFetchingError: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    school: [],
    schoolFetchingError: null,
  }

  componentDidMount() {
    const { match: { params: { id } }, onFetchSchool } = this.props;
    onFetchSchool(id);
  }

  render() {
    const {
      props: {
        school,
        schoolFetching,
        schoolFetchingError,
      },
    } = this;

    if (!school || schoolFetching) {
      return <div>Loading</div>;
    }

    if (schoolFetchingError) {
      return <div>{schoolFetchingError.message}</div>;
    }

    return (
      <Paper>
        <Grid container spacing={40}>
          <Grid item xs={12} md={6}>
            <Typography variant="title" gutterBottom>
              {school.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            Map
            <div style={{ height: 700 }}>
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
    );
  }
}

const mapStateToProps = createSelector(
  selectSchool(),
  selectSchoolFetching(),
  selectSchoolFetchingError(),
  (
    school, schoolFetching, schoolFetchingError,
  ) => ({
    school, schoolFetching, schoolFetchingError,
  }),
);

const mapDispatchToProps = {
  onFetchSchool: fetchSchool,
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
