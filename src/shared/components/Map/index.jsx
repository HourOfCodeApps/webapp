import React from 'react';
import PropTypes from 'prop-types';

import { compose, withProps } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import config from 'config';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${config.map.key}&v=quarterly&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(({ children, forwardedRef, ...props }) => (
  <GoogleMap
    ref={forwardedRef}
    // defaultZoom={props.defaultZoom}
    // defaultCenter={props.defaultCenter}
    // options={props.options}
    {...props}
    // onCenterChanged={data => console.log('onCenterChanged', data)}
    // onBoundsChanged={data => console.log('onBoundsChanged', data)}
  >
    {children}
  </GoogleMap>
));

Map.propTypes = {
  defaultZoom: PropTypes.number,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  options: PropTypes.instanceOf(Object),
};

Map.defaultProps = {
  defaultZoom: 8,
  defaultCenter: { lat: 0, lng: 0 },
  options: {},
};

export default Map;
export {
  InfoWindow,
  Marker,
  MarkerClusterer,
};
