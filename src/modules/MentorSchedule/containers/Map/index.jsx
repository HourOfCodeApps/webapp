import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import Map, { Marker, MarkerClusterer } from 'shared/components/Map';
import Loading from 'shared/components/Loading';

import PersonPin from 'assets/img/person-pin.svg';

import {
  getUserGeolocation,
} from '../../actions';

import {
  selectUserLocation,
  selectUserLocationFetching,
  selectUserLocationFetchingError,
} from '../../selectors';

const getCenter = (userLocation) => {
  if (!userLocation) {
    return { lat: 49.84183, lng: 24.03125 };
  }

  return { lat: userLocation.latitude, lng: userLocation.longitude };
};


class Schedule extends React.Component {
  componentDidMount() {
    this.props.onGetUserGeolocation();
  }

  setMapRef = (map) => {
    this.map = map;
  };

  handleBoundsChanged = () => {
    if (!this.map || !this.map.getBounds) {
      return;
    }
    const bounds = this.map.getBounds();
    this.props.onBoundsChanged(bounds.getSouthWest().toJSON(), bounds.getNorthEast().toJSON());
  }

  render() {
    const {
      handleBoundsChanged,
      setMapRef,
      props: {
        timeslots,
        userLocation,
        userLocationFetching,
      },
    } = this;

    // const daySchools = timeslotsByDays[selectedDay] || {};

    return (
      <React.Fragment>
        <div style={{ height: 400 }}>
          {userLocationFetching && <Loading />}
          {!userLocationFetching && (
            <Map
              forwardedRef={setMapRef}
              defaultCenter={getCenter(userLocation)}
              defaultZoom={15}
              options={{
                // disableDefaultUI: true,
                // draggable: false,
              }}
              // onCenterChanged={data => console.log('onCenterChanged', data)}
              onBoundsChanged={handleBoundsChanged}
            >
              {userLocation && (
                <Marker
                  position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
                  icon={PersonPin}
                />
              )}

              <MarkerClusterer
                // onClick={props.onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={60}
                minimumClusterSize={1}
              >
                {timeslots.map(t => (
                  <Marker
                    key={t.id}
                    position={{ lat: t.geo.latitude, lng: t.geo.longitude }}
                  />
                ))}
              </MarkerClusterer>
            </Map>
          )}
        </div>
      </React.Fragment>
    );
  }
}

Schedule.propTypes = {
  onGetUserGeolocation: PropTypes.func.isRequired,
  onBoundsChanged: PropTypes.func,
  userLocation: PropTypes.instanceOf(Object),
  userLocationFetching: PropTypes.bool.isRequired,
  userLocationFetchingError: PropTypes.instanceOf(Object),
};

Schedule.defaultProps = {
  onBoundsChanged: () => {},
  userLocation: null,
  userLocationFetchingError: null,
};

const mapStateToProps = createSelector(
  selectUserLocation(),
  selectUserLocationFetching(),
  selectUserLocationFetchingError(),
  (
    userLocation,
    userLocationFetching,
    userLocationFetchingError,
  ) => ({
    userLocation,
    userLocationFetching,
    userLocationFetchingError,
  }),
);

const mapDispatchToProps = {
  onGetUserGeolocation: getUserGeolocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
