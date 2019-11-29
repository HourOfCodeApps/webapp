import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import Map, { InfoWindow, Marker } from 'shared/components/Map';
import Loading from 'shared/components/Loading';

import PersonPin from 'assets/img/person-pin.svg';
import RedPin from 'assets/img/pin-red.svg';
import GreenPin from 'assets/img/pin-green.svg';

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
  state = {
    hoveredPin: null,
  };

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

  handleMouseOver = id => () => {
    // this.props.onHover(id);
    this.setState({ hoveredPin: id });
  }

  handleMouseOut = () => {
    this.setState({ hoveredPin: null });
  }

  render() {
    const {
      handleBoundsChanged,
      handleMouseOver,
      // handleMouseOut,
      setMapRef,
      props: {
        schoolIds,
        schoolsMap,
        timeslotsBySchool,
        userLocation,
        userLocationFetching,
        zoom,
        hoveredPin: highlightedPin,
      },
      state: {
        hoveredPin,
      },
    } = this;

    // const daySchools = timeslotsByDays[selectedDay] || {};

    return (
      <React.Fragment>
        <div style={{ height: 300 }}>
          {userLocationFetching && <Loading />}
          {!userLocationFetching && (
            <Map
              forwardedRef={setMapRef}
              defaultCenter={getCenter(userLocation)}
              // defaultZoom={zoom}
              zoom={zoom}
              options={{
                // maxZoom: zoom,
                gestureHandling: 'cooperative',
                // disableDefaultUI: true,
                // draggable: false,
                styles: [
                  {
                    featureType: 'poi.attraction',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.business',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.government',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.medical',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'labels',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.place_of_worship',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.sports_complex',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                ],
              }}
              onBoundsChanged={handleBoundsChanged}
            >
              {userLocation && (
                <Marker
                  position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
                  icon={PersonPin}
                />
              )}

              {(schoolIds || []).map(id => schoolsMap[id]).filter(v => v).map(school => (
                <Marker
                  key={school.id}
                  position={{ lat: school.latitude, lng: school.longitude }}
                  onMouseOver={handleMouseOver(school.id)}
                  onFocus={handleMouseOver(school.id)}
                  onMouseOut={handleMouseOver(null)}
                  onBlur={handleMouseOver(null)}
                  label={timeslotsBySchool[school.id].length.toString()}
                  icon={{
                    labelOrigin: { x: 13.75, y: 15 },
                    url: (hoveredPin === school.id || highlightedPin === school.id)
                      ? GreenPin
                      : RedPin,
                  }}
                >
                  {/* {this.state.hoveredPin === school.id && ( */}
                  {hoveredPin === school.id && (
                    <InfoWindow>
                      <div>
                        <div>{school.name}</div>
                        <p>
                          {school.addressStreet}
                          ,&nbsp;
                          {school.addressBuilding}
                        </p>
                        <div>
                          Доступних уроків:&nbsp;
                          {timeslotsBySchool[school.id].length}
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}

              {/* <MarkerClusterer
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
              </MarkerClusterer> */}
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
  // userLocationFetchingError: PropTypes.instanceOf(Object),
  schoolIds: PropTypes.instanceOf(Array),
  schoolsMap: PropTypes.instanceOf(Object),
  timeslotsBySchool: PropTypes.instanceOf(Object),
  zoom: PropTypes.number.isRequired,
  hoveredPin: PropTypes.string,
};

Schedule.defaultProps = {
  onBoundsChanged: () => {},
  schoolIds: [],
  schoolsMap: {},
  timeslotsBySchool: {},
  userLocation: null,
  // userLocationFetchingError: null,
  hoveredPin: null,
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
